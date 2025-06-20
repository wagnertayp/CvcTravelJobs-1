import { useState, useEffect } from "react";
import {
  CreditCard,
  BookOpen,
  Key,
  Download,
  Eye,
  EyeOff,
  Laptop,
  Headphones,
  Wifi,
  MapPin,
  X,
  CheckCircle,
  Stethoscope,
  FlaskConical,
  Building2,
  Heart,
  Shield,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";

export default function Beneficios() {
  const [, setLocation] = useLocation();
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [isCardRotating, setIsCardRotating] = useState(false);
  const [showCardBack, setShowCardBack] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [equipmentStep, setEquipmentStep] = useState(1); // 1: show items and term, 2: digital signature, 3: shipping form
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState("");
  const [signaturePerformed, setSignaturePerformed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [configurationStep, setConfigurationStep] = useState(0);
  const [systemReady, setSystemReady] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    numero: "52818073270760000",
    validade: "12/29",
    cvv: "847",
  });

  // Get stored CPF data from actual validation process
  useEffect(() => {
    // Clear any old test data first
    const oldData = localStorage.getItem("validatedCPFData");
    if (oldData) {
      try {
        const parsed = JSON.parse(oldData);
        // If it contains test data, clear it
        if (parsed.nome === "João Silva Santos") {
          localStorage.removeItem("validatedCPFData");
        }
      } catch (e) {
        localStorage.removeItem("validatedCPFData");
      }
    }
    
    const storedData = localStorage.getItem("validatedCPFData");
    
    if (storedData) {
      try {
        const cpfData = JSON.parse(storedData);
        
        if (cpfData.nome && cpfData.cpf) {
          // Use the exact name from CPF API response
          const authenticName = cpfData.nome.toUpperCase();
          
          setUserData(prev => ({
            ...prev,
            nome: authenticName,
          }));
          
          setDigitalSignature(authenticName);
        }
      } catch (error) {
        console.error("Error parsing CPF data:", error);
        setUserData(prev => ({
          ...prev,
          nome: "ERRO NA VALIDAÇÃO",
        }));
      }
    } else {
      // No CPF validation completed yet
      setUserData(prev => ({
        ...prev,
        nome: "VALIDAÇÃO PENDENTE",
      }));
    }
  }, []);



  const handleCepChange = async (cep: string) => {
    setShippingAddress(prev => ({ ...prev, cep }));
    
    if (cep.length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://opencep.com/v1/${cep}`);
        const data = await response.json();
        
        if (data.cep) {
          setShippingAddress(prev => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));
        } else {
          // Clear fields for invalid CEP
          setShippingAddress(prev => ({
            ...prev,
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        // Clear fields on error
        setShippingAddress(prev => ({
          ...prev,
          rua: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
      }
      setIsLoadingCep(false);
    } else {
      // Clear fields for incomplete CEP
      setShippingAddress(prev => ({
        ...prev,
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
      }));
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressConfirmed(true);
    setShowEquipmentForm(false);
  };

  const handleSignature = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSignaturePerformed(true);
    }, 4000);
  };

  const configurationSteps = [
    "Validando credenciais do sistema...",
    "Configurando dashboard de vendas...",
    "Integrando catálogo de produtos...",
    "Ativando sistema de comissões...",
    "Configurando notificações automáticas...",
    "Finalizando configuração do sistema..."
  ];

  const startConfiguration = () => {
    setIsConfiguring(true);
    const interval = setInterval(() => {
      setConfigurationStep(prev => {
        if (prev < configurationSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setSystemReady(true);
          }, 1000);
          return prev;
        }
      });
    }, 1500);

    setTimeout(() => {
      clearInterval(interval);
      setSystemReady(true);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seus Benefícios CVC
          </h1>
          <p className="text-gray-600">
            Acesse todos os benefícios exclusivos para agentes CVC
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* CVC Card */}
          <div className="xl:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-cvc-blue" />
              </div>
              <h2 className="font-semibold text-cvc-blue text-[18px]">Cartão de Uso Pessoal CVC</h2>
            </div>
            
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">Cartão de Comissões</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">Saque, compre e pague em qualquer lugar com seu saldo.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 flex justify-center">
              <div className="relative w-80 h-48">
                <div 
                  className={`absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
                    showCardBack ? 'rotate-y-180' : ''
                  } ${isCardRotating ? 'transition-transform' : ''}`}
                >
                  {/* Card Front */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-2xl bg-gradient-to-br from-black via-gray-900 via-gray-800 to-gray-700 text-white p-6 flex flex-col justify-between"
                       style={{
                         background: `
                           radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                           linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%)
                         `,
                         boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                       }}>
                    <div className="flex justify-between items-start">
                      <img 
                        src="https://images.seeklogo.com/logo-png/30/3/cvc-logo-png_seeklogo-303807.png" 
                        alt="CVC" 
                        className="h-8 w-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.textContent = 'CVC';
                        }}
                      />
                      <span className="hidden text-yellow-400 text-lg font-bold tracking-wider">CVC</span>
                      <img 
                        src="https://i.postimg.cc/1zq8LHxW/visa-logowhite.png" 
                        alt="Visa" 
                        className="h-6"
                      />
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm shadow-lg"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-left">
                        <p className="text-lg font-mono tracking-wider text-white">
                          {showCardNumber ? "5281 8073 2707 6000" : "•••• •••• •••• 6000"}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex-1">
                          <p className="text-xs text-gray-300 uppercase tracking-wide">Nome do Portador</p>
                          <p className="font-medium text-white truncate text-[13px]">{userData.nome}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xs text-gray-300 uppercase tracking-wide">Validade</p>
                          <p className="text-sm font-medium text-white">{userData.validade}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-2xl bg-gradient-to-br from-black via-gray-900 via-gray-800 to-gray-700 text-white flex flex-col"
                       style={{
                         background: `
                           radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                           linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%)
                         `,
                         boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                       }}>
                    {/* Magnetic stripe */}
                    <div className="h-10 bg-black mt-4 mx-0"></div>
                    
                    {/* Card content */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      {/* CVV area */}
                      <div className="bg-gray-200 h-6 rounded flex items-center justify-end pr-2 mt-2">
                        <span className="text-black font-mono text-xs font-bold">{userData.cvv}</span>
                      </div>
                      
                      {/* Middle content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-center mb-3">
                          <p className="text-red-400 font-bold text-xs bg-red-900 bg-opacity-40 px-2 py-1 rounded inline-block">
                            USO EXCLUSIVO AGENTE CVC
                          </p>
                        </div>
                      </div>
                      
                      {/* Bottom info */}
                      <div className="text-xs text-gray-300 space-y-1 text-center">
                        <p className="font-medium">Atendimento 24h: 0800 878 1000</p>
                        <p>Em caso de perda ou roubo, ligue imediatamente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showCardNumber ? "Ocultar Número" : "Ver Número"}
                </Button>
                <Button
                  onClick={() => {
                    setIsCardRotating(true);
                    setShowCardBack(!showCardBack);
                    setTimeout(() => setIsCardRotating(false), 600);
                  }}
                  variant="outline"
                  size="sm"
                >Ver Verso</Button>
              </div>
              
            </div>
          </div>

          {/* Amil Health Insurance Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <h2 className="font-semibold text-gray-900 text-[18px]">
                Plano de Saúde Amil
              </h2>
            </div>
            
            <div className="mb-6 flex justify-center">
              <div className="w-80 h-48 rounded-xl shadow-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <img 
                    src="https://i.postimg.cc/kXJtBK84/Amil-logo-2018.png" 
                    alt="Amil" 
                    className="h-8"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.textContent = 'AMIL';
                    }}
                  />
                  <span className="hidden text-white text-xl font-bold">AMIL</span>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+</span>
                  </div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <div>
                    <p className="text-xs text-blue-100 uppercase tracking-wide">REGISTRO</p>
                    <p className="text-lg font-mono">
                      {userData.nome.replace(/\s+/g, '').slice(0, 4)} {userData.numero.slice(-8)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide">Beneficiário</p>
                      <p className="font-medium text-[13px]">{userData.nome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-100 uppercase tracking-wide">Validade</p>
                      <p className="text-sm font-medium">12/2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="bg-cvc-yellow/10 p-3 rounded-lg text-center">
                <div className="w-8 h-8 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                  <Stethoscope className="h-4 w-4 text-cvc-blue" />
                </div>
                <p className="text-xs font-medium text-cvc-blue mb-1">Consultas Ilimitadas</p>
                <p className="text-xs text-cvc-dark-blue">Médicos especialistas</p>
              </div>
              
              <div className="bg-cvc-yellow/10 p-3 rounded-lg text-center">
                <div className="w-8 h-8 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                  <FlaskConical className="h-4 w-4 text-cvc-blue" />
                </div>
                <p className="text-xs font-medium text-cvc-blue mb-1">Exames Laboratoriais</p>
                <p className="text-xs text-cvc-dark-blue">Sangue, urina e imagem</p>
              </div>
              
              <div className="bg-cvc-yellow/10 p-3 rounded-lg text-center">
                <div className="w-8 h-8 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building2 className="h-4 w-4 text-cvc-blue" />
                </div>
                <p className="text-xs font-medium text-cvc-blue mb-1">Internações</p>
                <p className="text-xs text-cvc-dark-blue">Hospitais credenciados</p>
              </div>
              
              <div className="bg-cvc-yellow/10 p-3 rounded-lg text-center">
                <div className="w-8 h-8 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-4 w-4 text-cvc-blue" />
                </div>
                <p className="text-xs font-medium text-cvc-blue mb-1">Cirurgias</p>
                <p className="text-xs text-cvc-dark-blue">Emergência e eletivas</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                <strong>Cobertura Nacional:</strong> Plano de saúde válido e ilimitado em todo o Brasil. 
                Atendimento em hospitais e clínicas credenciadas em todas as capitais e principais cidades.
              </p>
            </div>
          </div>

          {/* Training Guide */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-cvc-blue" />
              </div>
              <h2 className="font-semibold text-cvc-blue text-[18px]">Guia de Treinamento CVC</h2>
            </div>
            
            <div className="mb-6 text-center">
              <img 
                src="https://i.postimg.cc/tC5HJH5W/20250616-0241-Captura-em-Laptop-remix-01jxvm0qpce2g9p9hgbesemaj2.png" 
                alt="Guia de Treinamento CVC" 
                className="w-full max-w-xs h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:gap-2 md:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform mb-1 sm:mb-0">
                    <CheckCircle className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">Certificação Oficial</h4>
                    <p className="text-xs text-blue-700 mt-0.5 leading-tight hidden sm:block">Reconhecimento CVC</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:gap-2 md:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform mb-1 sm:mb-0">
                    <BookOpen className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">Material Completo</h4>
                    <p className="text-xs text-blue-700 mt-0.5 leading-tight hidden sm:block">Conteúdo atualizado</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:gap-2 md:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform mb-1 sm:mb-0">
                    <Wifi className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">Acesso Online</h4>
                    <p className="text-xs text-blue-700 mt-0.5 leading-tight hidden sm:block">24/7 disponível</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:gap-2 md:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform mb-1 sm:mb-0">
                    <Heart className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">Suporte Premium</h4>
                    <p className="text-xs text-blue-700 mt-0.5 leading-tight hidden sm:block">Assistência especializada</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              Plataforma online com aulas interativas e certificação oficial CVC
            </p>
          </div>

          {/* System Access Token */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <Key className="h-5 w-5 text-cvc-blue" />
              </div>
              <h2 className="font-semibold text-cvc-blue text-lg">
                Token de Acesso ao Sistema
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chave de Acesso Personalizada
                </label>
                <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-blue-900 tracking-wider mb-2">
                      {`CVC${userData.nome.replace(/\s+/g, '').slice(0, 3).toUpperCase()}2025X7R`}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs border border-green-500 bg-green-100 text-green-700 font-semibold">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      TOKEN VALIDADO
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <div className="bg-green-100 border border-green-500 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-700" />
                  <span className="text-sm text-green-700 font-bold">Token Validado</span>
                </div>
                <p className="text-xs text-green-700 mt-1">Seu token de agente CVC foi validado com sucesso. Sistema pronto para uso.</p>
              </div>
            </div>
          </div>

          {/* Equipment Kit */}
          <div className="xl:col-span-3 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <Laptop className="h-5 w-5 text-cvc-blue" />
              </div>
              <h2 className="font-semibold text-cvc-blue text-[18px]">Kit Home Office Gratuito</h2>
            </div>
            
            <div className="mb-6 text-center">
              <img 
                src="https://i.postimg.cc/y8BGTN22/20250615-1603-Kit-Home-Office-Personalizado-remix-01jxtfhja9fvs9ncffx2gb00x6.png" 
                alt="Kit Home Office CVC" 
                className="mx-auto w-full max-w-2xl h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                <Laptop className="h-6 w-6 text-cvc-blue mx-auto mb-1" />
                <h4 className="font-medium text-cvc-blue text-sm">Notebook Dell</h4>
                <span className="inline-block mt-1 text-xs text-green-600 font-medium">INCLUÍDO</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                <Headphones className="h-6 w-6 text-cvc-blue mx-auto mb-1" />
                <h4 className="font-medium text-cvc-blue text-sm">Headset</h4>
                <span className="inline-block mt-1 text-xs text-green-600 font-medium">INCLUÍDO</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                <Wifi className="h-6 w-6 text-cvc-blue mx-auto mb-1" />
                <h4 className="font-medium text-cvc-blue text-sm">Auxílio Internet</h4>
                <p className="text-xs text-gray-600 mb-1">R$ 159,90/mês</p>
                <span className="inline-block text-xs text-green-600 font-medium">INCLUÍDO</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                <Key className="h-6 w-6 text-cvc-blue mx-auto mb-1" />
                <h4 className="font-medium text-cvc-blue text-sm">Token Pen Drive</h4>
                <span className="inline-block mt-1 text-xs text-green-600 font-medium">INCLUÍDO</span>
              </div>
            </div>
            
            <div className="bg-cvc-yellow bg-opacity-20 p-4 rounded-lg border border-cvc-yellow mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-cvc-blue" />
                <div className="flex-1">
                  <h4 className="font-medium text-cvc-blue">Kit Gratuito - Brasília/DF</h4>
                  <p className="text-sm text-cvc-blue">Entrega gratuita na sua região</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Termo de Responsabilidade</h4>
              <p className="text-xs text-gray-500 mb-3">Aceite os termos de uso para prosseguir</p>
              <div className="max-h-32 overflow-y-auto text-sm text-gray-600 mb-4 bg-white p-3 rounded border">
                <p className="mb-2">
                  Eu, {userData.nome}, declaro estar ciente de que os equipamentos fornecidos pela CVC são de uso exclusivo para atividades relacionadas à função de Agente de Viagens.
                </p>
                <p className="mb-2">
                  Comprometo-me a:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Utilizar os equipamentos apenas para fins profissionais</li>
                  <li>Manter os equipamentos em bom estado de conservação</li>
                  <li>Não realizar empréstimos ou transferir a terceiros</li>
                  <li>Comunicar imediatamente em caso de danos ou furto</li>
                  <li>Devolver os equipamentos em caso de desligamento da empresa</li>
                </ul>
                <p className="mt-2">
                  Estou ciente de que o não cumprimento destes termos pode resultar em cobrança do valor integral dos equipamentos e/ou rescisão do contrato de trabalho.
                </p>
              </div>
              
              <div className="space-y-4">
                {!termsAccepted && (
                  <Button
                    onClick={() => setTermsAccepted(true)}
                    className="w-full bg-cvc-blue hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Li e Concordo com os Termos
                  </Button>
                )}
                
                {termsAccepted && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                      <h5 className="text-sm font-medium text-blue-900 mb-2">Dados para Assinatura Digital</h5>
                      <div className="space-y-1 text-xs text-blue-700">
                        <div><span className="font-medium">Nome:</span> {userData.nome}</div>
                        <div><span className="font-medium">Data de Nascimento:</span> {(() => {
                          const cpfData = localStorage.getItem('validatedCPFData');
                          if (cpfData) {
                            try {
                              const parsed = JSON.parse(cpfData);
                              return parsed.data_nascimento || 'Não informado';
                            } catch (e) {
                              return 'Não informado';
                            }
                          }
                          return 'Não informado';
                        })()}</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assinatura Digital
                      </label>
                      <Input
                        value={digitalSignature}
                        onChange={(e) => setDigitalSignature(e.target.value)}
                        placeholder="Digite seu nome completo"
                        className="w-full"
                      />
                    </div>
                    
                    {digitalSignature && !signaturePerformed && !isSigning && (
                      <Button
                        onClick={handleSignature}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Realizar Assinatura
                      </Button>
                    )}
                    
                    {isSigning && (
                      <div className="w-full bg-cvc-yellow bg-opacity-20 border border-cvc-yellow rounded-lg p-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cvc-blue"></div>
                          <span className="text-cvc-blue font-medium">Assinando...</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cvc-blue rounded-full animate-pulse"></div>
                            <span className="text-cvc-blue">Atualizando certificado digital</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cvc-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <span className="text-cvc-blue">Contatando jurídico para validação</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cvc-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                            <span className="text-cvc-blue">Finalizando processo de certificação</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {signaturePerformed && !isSigning && (
                      <Button
                        onClick={() => setShowEquipmentForm(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Confirmar Endereço de Entrega
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {addressConfirmed && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Endereço Confirmado</span>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Você verá as informações de envio no final do processo de configuração.
                </p>
                <Button
                  onClick={() => setShowEquipmentForm(true)}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  Editar Endereço
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Continue Button */}
        {addressConfirmed && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setLocation("/sistema-de-vendas")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Prosseguir
            </Button>
          </div>
        )}
      </div>
      {/* Shipping Form Modal */}
      {showEquipmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-cvc-blue">
                  Endereço de Entrega
                </h3>
                <Button
                  onClick={() => setShowEquipmentForm(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="px-6 py-4">

              <div className="mb-4 p-3 bg-cvc-yellow/10 rounded-lg border border-cvc-yellow/30">
                <div className="text-sm font-medium text-cvc-blue mb-2">Kit Profissional:</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Notebook Dell Core i5</div>
                  <div>Headset Premium</div>
                  <div>Token Pen Drive</div>
                  <div>Cartão Pessoal CVC</div>
                </div>
                <div className="mt-2 p-2 bg-green-50 rounded text-xs">
                  <span className="text-green-700 font-medium">✓ Entrega Gratuita</span>
                </div>
              </div>

              <div className="space-y-4">

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP *
                    </label>
                    <div className="relative">
                      <Input
                        value={shippingAddress.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="00000-000"
                        maxLength={8}
                        required
                        className="pr-10"
                      />
                      {isLoadingCep && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cvc-blue"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logradouro *
                    </label>
                    <Input
                      value={shippingAddress.rua}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, rua: e.target.value }))}
                      placeholder="Nome da rua, avenida..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número *
                      </label>
                      <Input
                        value={shippingAddress.numero}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, numero: e.target.value }))}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro *
                      </label>
                      <Input
                        value={shippingAddress.bairro}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, bairro: e.target.value }))}
                        placeholder="Bairro"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade *
                      </label>
                      <Input
                        value={shippingAddress.cidade}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, cidade: e.target.value }))}
                        placeholder="Cidade"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UF *
                      </label>
                      <Input
                        value={shippingAddress.estado}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, estado: e.target.value }))}
                        placeholder="UF"
                        maxLength={2}
                        required
                        className="uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-cvc-blue hover:bg-cvc-dark-blue text-white py-3 font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmar Endereço
                  </Button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}