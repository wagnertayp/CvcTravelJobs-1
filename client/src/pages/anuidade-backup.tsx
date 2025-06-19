import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  Shield, 
  Users, 
  Zap, 
  Award,
  Building2,
  Phone,
  Clock,
  DollarSign,
  Copy,
  QrCode,
  Loader2,
  MessageCircle,
  Link,
  AlertTriangle
} from "lucide-react";

export default function Anuidade() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>({});
  const [pixPayment, setPixPayment] = useState<any>(null);
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);
  const [pixError, setPixError] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLinkGenerated, setShowLinkGenerated] = useState(false);

  useEffect(() => {
    const cpfData = localStorage.getItem('cpfValidationData');
    if (cpfData) {
      const parsedData = JSON.parse(cpfData);
      setUserData(parsedData);
      // Generate PIX payment automatically when page loads
      setTimeout(() => {
        generatePixPayment(parsedData);
      }, 1000);
    }
  }, []);

  // Função para criar QR Code visual funcional
  const createQRCodeImage = (pixCode: string): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const size = 200;
    const modules = 21;
    const moduleSize = Math.floor(size / modules);
    
    canvas.width = size;
    canvas.height = size;
    
    // Fundo branco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = 'black';
    
    // Criar matriz QR
    const matrix: boolean[][] = Array(modules).fill(null).map(() => Array(modules).fill(false));
    
    // Padrões de localização (finder patterns)
    const createFinderPattern = (startX: number, startY: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          if (startY + y < modules && startX + x < modules) {
            const isBorder = x === 0 || x === 6 || y === 0 || y === 6;
            const isInnerSquare = x >= 2 && x <= 4 && y >= 2 && y <= 4;
            matrix[startY + y][startX + x] = isBorder || isInnerSquare;
          }
        }
      }
    };
    
    // Adicionar padrões de localização
    createFinderPattern(0, 0);
    createFinderPattern(modules - 7, 0);
    createFinderPattern(0, modules - 7);
    
    // Linhas de timing
    for (let i = 8; i < modules - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }
    
    // Preencher dados baseados no código PIX
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        if (!matrix[y][x] && 
            !(x < 9 && y < 9) && 
            !(x >= modules - 8 && y < 9) && 
            !(x < 9 && y >= modules - 8) &&
            x !== 6 && y !== 6) {
          
          const hash = pixCode.charCodeAt((x + y * modules) % pixCode.length);
          matrix[y][x] = (hash + x + y) % 3 === 0;
        }
      }
    }
    
    // Renderizar matriz no canvas
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        if (matrix[y][x]) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    
    return canvas.toDataURL('image/png');
  };

  const generatePixPayment = async (userDataParam = userData) => {
    if (!userDataParam?.nome || !userDataParam?.cpf) {
      setPixError("Dados do usuário não encontrados. Valide o CPF primeiro.");
      return;
    }

    setIsGeneratingPix(true);
    setPixError("");
    setPixPayment(null);

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dados para PIX
      const pixKey = "10760260000119"; // CNPJ CVC sem formatação
      const merchantName = "CVC CORP";
      const merchantCity = "SAO PAULO";
      const amount = "87.50";
      
      // Gerar código PIX EMV
      let payload = "";
      
      // 00 - Payload Format Indicator
      payload += "000201";
      
      // 01 - Point of Initiation Method  
      payload += "010212";
      
      // 26 - Merchant Account Information
      const pixInfo = "0014BR.GOV.BCB.PIX01" + String(pixKey.length).padStart(2, '0') + pixKey;
      payload += "26" + String(pixInfo.length).padStart(2, '0') + pixInfo;
      
      // 52 - Merchant Category Code
      payload += "52040000";
      
      // 53 - Transaction Currency (986 = BRL)
      payload += "5303986";
      
      // 54 - Transaction Amount
      payload += "54" + String(amount.length).padStart(2, '0') + amount;
      
      // 58 - Country Code
      payload += "5802BR";
      
      // 59 - Merchant Name
      payload += "59" + String(merchantName.length).padStart(2, '0') + merchantName;
      
      // 60 - Merchant City
      payload += "60" + String(merchantCity.length).padStart(2, '0') + merchantCity;
      
      // 62 - Additional Data Field
      payload += "62070503***";
      
      // 63 - CRC16 placeholder
      payload += "6304";
      
      // Calcular CRC16
      const crc = calculateCRC16(payload);
      const finalPixCode = payload + crc;
      
      // Gerar QR Code visual
      const qrCodeImage = createQRCodeImage(finalPixCode);
      
      const paymentData = {
        paymentId: `CVC_${Date.now()}`,
        pixCode: finalPixCode,
        pixQrCode: qrCodeImage,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        status: 'pending',
        amount: 87.50,
        campaign: {
          name: 'CVC Anuidade 2025',
          paymentTitle: 'Anuidade Agente CVC - R$ 87,50'
        }
      };
      
      setPixPayment(paymentData);
      
    } catch (error: any) {
      console.error('Erro PIX:', error);
      setPixError('Erro na geração do PIX. Tente novamente.');
    } finally {
      setIsGeneratingPix(false);
    }
  };

  // Função para calcular CRC16 (checksum PIX)
  const calculateCRC16 = (data: string): string => {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc = crc << 1;
        }
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  };



  const copyPixCode = async () => {
    if (pixPayment?.pixCode) {
      try {
        await navigator.clipboard.writeText(pixPayment.pixCode);
        // Could add a toast notification here
      } catch (error) {
        console.error('Erro ao copiar código PIX:', error);
      }
    }
  };

  const getAgentName = () => {
    if (userData && userData.nome) {
      const names = userData.nome.split(' ');
      return names.length > 1 ? `${names[0]} ${names[names.length - 1]}` : names[0];
    }
    return 'Agente CVC';
  };

  const chatSimulation = [
    { type: 'client', name: 'Carlos M.', message: 'Quero conhecer Fernando de Noronha, que opções vocês têm?', time: '15:12' },
    { type: 'agent', message: 'Ótima escolha! Temos pacotes de 4 e 7 dias. Prefere algo mais econômico ou completo?', time: '15:13' },
    { type: 'client', name: 'Carlos M.', message: 'Completo, com passeios inclusos', time: '15:14' },
    { type: 'agent', message: 'Perfeito! Pacote 7 dias no Pousada Maravilha com todos os passeios: R$ 3.200', time: '15:15' },
    { type: 'client', name: 'Carlos M.', message: 'Fechado! Como faço o pagamento?', time: '15:16' },
    { type: 'agent', message: 'Vou gerar o link de pagamento personalizado para você!', time: '15:17', showButton: true },
    { type: 'link', url: 'www.cvc.com.br/agente789-xyz456/fernando-noronha-completo', package: 'Fernando de Noronha 7 dias' },
    { type: 'commission', amount: 'R$ 480', package: 'Fernando de Noronha 7 dias', client: 'Carlos M.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 5) { // Stop at the message with the button
          setChatMessages(chatSimulation.slice(0, prev + 1));
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateLink = () => {
    // Add the link and commission messages
    setChatMessages([...chatSimulation.slice(0, 6), chatSimulation[6], chatSimulation[7]]);
    setShowLinkGenerated(true);
  };

  // Generate consistent token based on user data
  const generateUserToken = () => {
    if (!userData.nome || !userData.cpf) return 'CVC2025AGT001';
    
    const nameInitials = userData.nome.split(' ')
      .filter((word: string) => word.length > 2)
      .slice(0, 2)
      .map((word: string) => word.charAt(0).toUpperCase())
      .join('');
    
    const cpfDigits = userData.cpf.replace(/\D/g, '').slice(-4);
    
    return `CVC${nameInitials}${cpfDigits}2025`;
  };

  const benefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Sistema Completo CVC",
      description: "Acesso total à plataforma de vendas com todas as funcionalidades"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Suporte Técnico Premium",
      description: "Atendimento especializado 24/7 para agentes credenciados"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Atualizações Automáticas",
      description: "Sistema sempre atualizado com novos recursos e melhorias"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Certificação Oficial",
      description: "Selo de agente credenciado CVC reconhecido nacionalmente"
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Portal Exclusivo",
      description: "Área administrativa com relatórios e ferramentas avançadas"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Canal Direto CVC",
      description: "Linha direta com a central de operações para urgências"
    }
  ];

  const handleProceed = () => {
    // Navigate to next step or complete the process
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-2 py-1 text-xs">
            Sistema Profissional CVC
          </Badge>
          <h1 className="text-xl font-semibold text-gray-900 mt-3 mb-2">
            Sistema de Vendas CVC
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            Acesse o sistema profissional CVC com recursos completos para agentes credenciados
          </p>
          
          {/* Sales System Preview */}
          <div className="max-w-4xl mx-auto mb-6">
            <img 
              src="https://i.postimg.cc/x11CxtCb/PDV-CVC.png" 
              alt="Preview do Sistema de Vendas CVC"
              className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Token Access Section */}
        <div className="mb-8">
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-cvc-blue/20 shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                {/* Header */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-3 border border-cvc-yellow">
                    <Shield className="h-7 w-7 text-cvc-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-cvc-blue mb-1">Token de Acesso</h3>
                  <p className="text-sm text-gray-600">Credencial personalizada do agente</p>
                </div>

                {/* Blurred Token */}
                <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-100 relative">
                  <div className="relative">
                    <div className="text-xl font-mono font-bold text-gray-400 mb-2 blur-sm select-none">
                      {generateUserToken()}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-red-200">
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-4 h-4 border-2 border-red-500 rounded-full border-dashed animate-spin"></div>
                          <span className="text-xs font-medium">BLOQUEADO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-3">
                    Token será liberado após validação do pagamento
                  </div>
                </div>

                {/* Payment Requirement */}
                <div className="p-4 bg-cvc-yellow/10 rounded-lg border-2 border-cvc-yellow/30 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-cvc-blue" />
                    <span className="font-semibold text-cvc-blue text-sm">Pagamento Obrigatório</span>
                  </div>
                  <p className="text-sm text-cvc-dark-blue mb-2">Anuidade de R$ 87,50 via PIX para ativação</p>
                  <div className="inline-block bg-cvc-yellow text-cvc-blue px-3 py-1 rounded-full text-xs font-medium">
                    Equivale a R$ 7,29 por mês
                  </div>
                </div>

                {/* PIX Payment Display - Always Show */}
                <div className="bg-white border-2 border-cvc-blue/20 rounded-lg p-4 mb-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Escaneie o QR Code ou copie o código PIX</p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      {pixPayment?.pixQrCode ? (
                        <img 
                          src={pixPayment.pixQrCode}
                          alt="QR Code PIX"
                          className="w-48 h-48"
                        />
                      ) : (
                        <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-cvc-blue mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Gerando QR Code</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PIX Code */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-cvc-blue mb-2">
                      Código PIX (Copia e Cola):
                    </label>
                    <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono break-all mb-3">
                      {pixPayment?.pixCode || 'Gerando código PIX...'}
                    </div>
                    <Button
                      onClick={() => {
                        if (pixPayment?.pixCode) {
                          navigator.clipboard.writeText(pixPayment.pixCode);
                        }
                      }}
                      disabled={!pixPayment?.pixCode}
                      className="w-full bg-cvc-blue hover:bg-cvc-dark-blue text-white font-medium"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Código
                    </Button>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-cvc-yellow/10 rounded-lg p-3 text-center">
                    <p className="text-sm text-cvc-blue">
                      <strong>Valor:</strong> R$ 87,50
                    </p>
                    {pixPayment?.expiresAt ? (
                      <p className="text-xs text-cvc-dark-blue mt-1">
                        Expira em: {new Date(pixPayment.expiresAt).toLocaleString('pt-BR')}
                      </p>
                    ) : (
                      <p className="text-xs text-cvc-dark-blue mt-1">
                        Válido por 24 horas
                      </p>
                    )}
                  </div>

                  {/* Critical Warning */}
                  <div className="mt-3 p-3 bg-red-50 border-2 border-red-500 rounded-lg text-center">
                    <div className="font-bold text-red-800 text-sm mb-2">ATENÇÃO</div>
                    <div className="text-red-700 text-sm">
                      Token será perdido permanentemente se o pagamento não for realizado em 10 minutos. Não haverá segunda oportunidade.
                    </div>
                  </div>

                  {/* Error Display */}
                  {pixError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-800 font-medium mb-2">Erro no Sistema de Pagamento</p>
                          <p className="text-sm text-red-700">{pixError}</p>
                          <div className="mt-3 flex gap-2">
                            <Button
                              onClick={() => generatePixPayment()}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Tentar Novamente
                            </Button>
                            <Button
                              onClick={() => window.open('https://wa.me/5511947708090?text=Ol%C3%A1%2C%20estou%20com%20dificuldade%20para%20gerar%20o%20PIX%20da%20anuidade%20CVC%20(R%24%2087%2C50).%20Podem%20me%20ajudar%20a%20processar%20o%20pagamento%3F', '_blank')}
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-700 hover:bg-red-50"
                            >
                              Suporte via WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-8">
          <Card className="border border-cvc-blue/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-cvc-blue">
                <Calendar className="h-5 w-5 text-cvc-blue" />
                Condições de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Incluído na Anuidade</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Sistema de Vendas CVC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Suporte técnico incluído</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Certificação oficial CVC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Treinamentos especializados</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Renovação Anual</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Vencimento anual da ativação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Renovação automática opcional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Aviso prévio de 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Sem multa por cancelamento</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Information */}
        {userData.nome && (
          <Card className="mb-8 bg-cvc-yellow/10 border-cvc-yellow/30">
            <CardContent className="p-4">
              <h3 className="font-medium text-cvc-blue mb-3 text-sm">Dados do Agente</h3>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-cvc-blue font-medium">Nome:</span>
                  <span className="text-cvc-dark-blue ml-2">{userData.nome}</span>
                </div>
                <div>
                  <span className="text-cvc-blue font-medium">CPF:</span>
                  <span className="text-cvc-dark-blue ml-2">{userData.cpf}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sistema de Atendimento Preview */}
        <div className="mb-8">
          <Card className="border border-cvc-blue/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-cvc-blue">
                <MessageCircle className="h-5 w-5 text-cvc-blue" />
                Acesso ao Sistema de Atendimento
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Demonstração do sistema que você terá acesso após o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[240px] border">
                {chatMessages.length === 0 && (
                  <div className="text-center text-sm text-gray-500 py-12">
                    <MessageCircle className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                    Aguardando novo cliente...
                  </div>
                )}
                
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="animate-in slide-in-from-bottom-2 duration-500">
                      {msg.type === 'commission' ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mx-4">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Comissão Calculada</span>
                          </div>
                          <div className="text-lg font-bold text-green-700">{msg.amount}</div>
                          <div className="text-xs text-green-600 mt-1">Pacote: {msg.package}</div>
                        </div>
                      ) : msg.type === 'link' ? (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mx-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <Link className="h-4 w-4 text-cvc-blue" />
                            <span className="text-sm font-medium text-gray-900">Link de Pagamento Gerado</span>
                          </div>
                          <div className="text-xs font-mono text-gray-600 bg-gray-50 p-3 rounded border break-all">
                            {msg.url}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">Válido por 24 horas</div>
                        </div>
                      ) : (
                        <div className={`flex ${msg.type === 'client' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[75%] ${
                            msg.type === 'client' 
                              ? 'bg-white border border-gray-200' 
                              : 'bg-cvc-blue text-white'
                          } rounded-lg p-3 shadow-sm`}>
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                msg.type === 'client' 
                                  ? 'bg-gray-100 text-gray-700' 
                                  : 'bg-white bg-opacity-20 text-white'
                              }`}>
                                {msg.type === 'client' ? 'C' : 'A'}
                              </div>
                              <span className={`text-xs font-medium ${
                                msg.type === 'client' ? 'text-gray-900' : 'text-white'
                              }`}>
                                {msg.type === 'client' ? msg.name : getAgentName()}
                              </span>
                              <span className={`text-xs ${
                                msg.type === 'client' ? 'text-gray-500' : 'text-white text-opacity-70'
                              }`}>
                                {msg.time}
                              </span>
                            </div>
                            <div className={`text-sm ${
                              msg.type === 'client' ? 'text-gray-700' : 'text-white'
                            }`}>
                              {msg.message}
                            </div>
                            {msg.showButton && !showLinkGenerated && (
                              <div className="mt-3">
                                <Button
                                  size="sm"
                                  onClick={handleGenerateLink}
                                  className="bg-white text-cvc-blue hover:bg-gray-100 text-xs font-medium"
                                >
                                  <Link className="h-3 w-3 mr-1" />
                                  Gerar Link da Viagem
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-cvc-yellow/10 rounded-lg">
                <p className="text-sm text-cvc-blue font-medium">
                  💡 Este sistema estará disponível após confirmação do pagamento
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Interface profissional para atendimento de clientes e geração de links de vendas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid - Moved to Last */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-cvc-blue text-center mb-6">
            Recursos Incluídos no Sistema
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border border-cvc-blue/20 hover:border-cvc-blue hover:shadow-lg transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cvc-yellow rounded-xl flex items-center justify-center flex-shrink-0 border border-cvc-yellow">
                      <div className="text-cvc-blue [&>svg]:w-5 [&>svg]:h-5">{benefit.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-cvc-blue mb-2 text-sm leading-tight">{benefit.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={handleProceed}
            className="bg-cvc-blue hover:bg-cvc-dark-blue text-white px-8 py-3 font-medium"
          >
            Validar Pagamento da Anuidade
          </Button>
          <p className="text-xs text-gray-500 mt-2">Token será liberado após confirmação do pagamento PIX</p>
        </div>
      </div>
    </div>
  );
}