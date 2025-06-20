import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Settings, Users, Globe, CreditCard, Shield, BarChart3, Camera, Upload, BadgeCheck, Calendar } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumb from '@/components/breadcrumb';
import { useLocation } from 'wouter';

export default function SistemaDeVendas() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<'initial' | 'configuring' | 'profile' | 'ready'>('initial');
  const [configurationStep, setConfigurationStep] = useState(-1);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [useCustomAgencyName, setUseCustomAgencyName] = useState(false);
  const [agencyName, setAgencyName] = useState("");

  const configurationSteps = [
    "Configurando ambiente de vendas",
    "Integrando sistema de pagamentos",
    "Configurando catálogo de produtos",
    "Ativando comissões automáticas",
    "Sincronizando dados do agente",
    "Finalizando configuração"
  ];

  const [userData, setUserData] = useState({
    nome: "MARINA SANTOS",
    cpf: "123.456.789-00"
  });

  const [bankingData, setBankingData] = useState({
    bank: "",
    agencia: "",
    conta: "",
    pixKey: "",
    paymentType: ""
  });

  useEffect(() => {
    const cpfData = sessionStorage.getItem('cpfData');
    if (cpfData) {
      const parsedData = JSON.parse(cpfData);
      if (parsedData && parsedData.nome) {
        const nameWords = parsedData.nome.split(' ');
        const firstTwoNames = nameWords.slice(0, 2).join(' ').toUpperCase();
        setUserData({
          nome: firstTwoNames,
          cpf: parsedData.cpf || "123.456.789-00"
        });
      }
    }

    // Load banking data
    const bankData = localStorage.getItem('bankingData');
    if (bankData) {
      const parsedBankData = JSON.parse(bankData);
      setBankingData(parsedBankData);
    }
  }, []);

  const startConfiguration = () => {
    setCurrentStep('configuring');
    setConfigurationStep(0);
    
    const interval = setInterval(() => {
      setConfigurationStep(prev => {
        if (prev >= configurationSteps.length - 1) {
          clearInterval(interval);
          setCurrentStep('profile');
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const proceedToReady = () => {
    setLocation('/anuidade');
  };

  // Calculate delivery date (3 business days from today)
  const getDeliveryDate = () => {
    const today = new Date();
    let businessDays = 0;
    let currentDate = new Date(today);
    
    while (businessDays < 3) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        businessDays++;
      }
    }
    
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Initial State - System Configuration Priority */}
          {currentStep === 'initial' && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-cvc-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Sistema de Vendas CVC</h2>
                <p className="text-gray-600">Configure seu ambiente personalizado de vendas</p>
              </div>

              {/* System Features - Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border text-center">
                  <Globe className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Portal Global</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <CreditCard className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Pagamentos</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <BarChart3 className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Comissões</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <Shield className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Segurança</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <Users className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Clientes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <Camera className="h-6 w-6 text-cvc-blue mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Perfil</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={startConfiguration}
                  className="bg-cvc-blue hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg"
                >
                  Configurar Sistema
                </Button>
              </div>
            </>
          )}

          {/* Configuration Process */}
          {currentStep === 'configuring' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-cvc-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Configurando Sistema</h3>
                <p className="text-gray-600">Preparando ambiente para {userData.nome}...</p>
              </div>
              
              <div className="max-w-md mx-auto space-y-3">
                {configurationSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      index <= configurationStep 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {index < configurationStep ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : index === configurationStep ? (
                      <div className="w-5 h-5 border-2 border-cvc-blue border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                    )}
                    <span className={`text-sm ${
                      index <= configurationStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Profile Setup - Compact */}
          {currentStep === 'profile' && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Configuração do Perfil</h3>
                <p className="text-gray-600">Configure sua foto no crachá digital</p>
              </div>

              {!profilePhoto ? (
                <div className="space-y-6">
                  {/* Photo Upload Options */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">Adicionar Foto do Perfil</h4>
                      <p className="text-sm text-gray-600">Escolha uma opção para adicionar sua foto</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Choose from Gallery */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-cvc-blue transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload-gallery"
                        />
                        <label htmlFor="photo-upload-gallery" className="cursor-pointer flex flex-col items-center">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-600 font-medium text-center">Escolher da Galeria</p>
                          <p className="text-xs text-gray-500 text-center">JPG, PNG (máx. 5MB)</p>
                        </label>
                      </div>

                      {/* Take Photo with Camera */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-cvc-blue transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload-camera"
                        />
                        <label htmlFor="photo-upload-camera" className="cursor-pointer flex flex-col items-center">
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-600 font-medium text-center">Tirar Foto</p>
                          <p className="text-xs text-gray-500 text-center">Usar câmera do dispositivo</p>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Agency Name - Premium */}
                  <div className="bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Settings className="h-3.5 w-3.5 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-base">Configuração da Agência</h4>
                    </div>

                    {/* Informative Text */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800 mb-1 text-sm">Configuração de Agência</h5>
                          <p className="text-sm text-blue-700">
                            Se você pretende abrir uma agência de viagens própria, selecione "Nome personalizado" e 
                            adicione o nome da sua futura agência. Isso personalizará seu crachá profissional.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Tipo de identificação</label>
                        <Select 
                          value={useCustomAgencyName ? "custom" : "personal"}
                          onValueChange={(value) => {
                            setUseCustomAgencyName(value === "custom");
                            if (value === "personal") {
                              setAgencyName("");
                            }
                          }}
                        >
                          <SelectTrigger className="w-full h-12 border-gray-300 focus:border-green-500 focus:ring-green-500">
                            <SelectValue placeholder="Selecione o tipo de identificação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">
                              <div className="flex flex-col">
                                <span className="font-medium">Nome pessoal (CVC CORP)</span>
                                <span className="text-xs text-gray-500">Usar identificação padrão da empresa</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="custom">
                              <div className="flex flex-col">
                                <span className="font-medium">Nome personalizado</span>
                                <span className="text-xs text-gray-500">Para agências de viagens próprias</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {useCustomAgencyName && (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Nome da sua agência</label>
                            <div className="relative">
                              <Input
                                placeholder="Ex: VIAGENS PREMIUM"
                                value={agencyName}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 8);
                                  setAgencyName(value.toUpperCase());
                                }}
                                maxLength={8}
                                className="text-sm h-10 w-full font-medium border-gray-300 focus:border-green-500 focus:ring-green-500"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-400 font-mono">{agencyName.length}/8</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Apenas letras e espaços permitidos</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cards Container */}
                  <div className="space-y-6">
                    {/* 3D CVC Agent Badge */}
                    <div className="flex justify-center">
                      <div className="relative" style={{ perspective: '1000px' }}>
                        <div 
                          className="relative w-72 h-96 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
                          style={{
                            background: `
                              linear-gradient(145deg, #1e40af 0%, #1e3a8a 30%, #1e40af 60%, #1e3a8a 100%),
                              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 40%)
                            `,
                            boxShadow: `
                              0 25px 50px rgba(30, 64, 175, 0.4),
                              0 15px 35px rgba(0, 0, 0, 0.3),
                              inset 0 2px 4px rgba(255,255,255,0.2),
                              inset 0 -2px 4px rgba(0,0,0,0.1),
                              0 0 0 1px rgba(255,255,255,0.1)
                            `,
                            transform: 'rotateX(5deg) rotateY(-2deg)',
                            border: '2px solid rgba(255,255,255,0.2)',
                            animation: 'badgeRotate 8s ease-in-out infinite'
                          }}
                        >
                          {/* Holographic overlay */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
                            style={{
                              background: `
                                linear-gradient(45deg, 
                                  transparent 30%, 
                                  rgba(255,255,255,0.1) 32%, 
                                  rgba(255,255,255,0.3) 34%, 
                                  transparent 36%,
                                  transparent 60%,
                                  rgba(255,255,255,0.1) 62%,
                                  rgba(255,255,255,0.2) 64%,
                                  transparent 66%
                                )
                              `,
                              animation: 'shimmer 3s infinite'
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-8 h-full flex flex-col">
                            {/* CVC Logo Area */}
                            <div className="text-center mb-6">
                              {useCustomAgencyName && agencyName ? (
                                <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mb-3 shadow-lg">
                                  <span className="text-blue-800 font-bold text-sm">{agencyName}</span>
                                </div>
                              ) : (
                                <div className="mb-3">
                                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                                    <img 
                                      src="https://i.postimg.cc/9Qz49tp0/d65eb110-87f3-4ea9-ae5f-0f3a80b9d721-removalai-preview.png"
                                      alt="CVC Logo"
                                      className="h-8 w-auto object-contain mx-auto"
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="text-white text-sm font-semibold tracking-wide">
                                {useCustomAgencyName && agencyName ? "AGÊNCIA DE VIAGENS" : "AGENTE OFICIAL"}
                              </div>
                            </div>

                            {/* Profile Photo */}
                            <div className="relative mb-6 flex-shrink-0">
                              <div className="w-28 h-28 mx-auto rounded-full border-4 border-white/80 shadow-xl overflow-hidden bg-white"
                                   style={{
                                     boxShadow: `
                                       0 8px 25px rgba(0,0,0,0.3),
                                       inset 0 0 0 2px rgba(255,255,255,0.5)
                                     `
                                   }}>
                                <img 
                                  src={profilePhoto} 
                                  alt="Perfil"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            {/* Agent Information */}
                            <div className="text-center flex-grow flex flex-col justify-center px-4">
                              <div className="mb-3">
                                <div className="text-white font-bold text-lg mb-2 flex items-center justify-center gap-2 drop-shadow-lg">
                                  <span className="text-shadow text-center leading-tight">
                                    {useCustomAgencyName && agencyName ? agencyName : userData.nome}
                                  </span>
                                  <BadgeCheck className="h-5 w-5 text-green-400 drop-shadow-lg flex-shrink-0" />
                                </div>
                                <div className="text-blue-100 text-sm font-medium tracking-wide drop-shadow">
                                  {useCustomAgencyName && agencyName ? "AGÊNCIA DE VIAGENS" : "AGENTE DE VIAGENS"}
                                </div>
                              </div>
                              
                              
                            </div>

                            {/* Security Features */}
                            <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-80 shadow-lg"></div>
                            <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-60 shadow-lg"></div>
                            
                            {/* Verification Strip */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
                          </div>

                          {/* 3D Edge Effect */}
                          <div 
                            className="absolute -right-1 top-2 bottom-2 w-1 rounded-r-2xl"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                              transform: 'rotateY(5deg)'
                            }}
                          />
                          <div 
                            className="absolute -bottom-1 left-2 right-2 h-1 rounded-b-2xl"
                            style={{
                              background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                              transform: 'rotateX(5deg)'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Congratulations Message */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mt-4  shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-white mb-1">
                            Parabéns, {userData.nome.split(' ')[0]}!
                          </h3>
                          <div className="text-yellow-200 font-semibold mb-2">
                            Você está apto.
                          </div>
                          <p className="text-blue-100 text-sm">
                            Para finalizar: <strong className="text-yellow-200">confirme os dados</strong> abaixo e <strong className="text-yellow-200">valide sua inscrição.</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  {/* Data Confirmation */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Confirmação de Dados</h4>
                    
                    <div className="space-y-4">
                      {/* Personal Data */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2 text-sm">Dados Pessoais</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Nome:</span>
                            <span className="ml-2 font-medium text-gray-900">{userData.nome}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">CPF:</span>
                            <span className="ml-2 font-medium text-gray-900">{userData.cpf}</span>
                          </div>
                        </div>
                      </div>

                      {/* Banking Data */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2 text-sm">Dados Bancários</h5>
                        {bankingData.paymentType === 'pix' ? (
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Tipo:</span>
                              <span className="ml-2 font-medium text-gray-900">PIX</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Chave PIX:</span>
                              <span className="ml-2 font-medium text-gray-900">{bankingData.pixKey}</span>
                            </div>
                          </div>
                        ) : bankingData.bank ? (
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Banco:</span>
                              <span className="ml-2 font-medium text-gray-900">{bankingData.bank}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <span className="text-gray-600">Agência:</span>
                                <span className="ml-2 font-medium text-gray-900">{bankingData.agencia}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Conta:</span>
                                <span className="ml-2 font-medium text-gray-900">{bankingData.conta}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            Conta configurada para recebimento de comissões
                          </div>
                        )}
                      </div>

                      {/* Internet Assistance */}
                      <div className="bg-cvc-yellow/10 border border-cvc-yellow/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-cvc-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <h5 className="font-medium text-cvc-blue mb-1 text-sm">Auxílio Internet</h5>
                            <p className="text-sm text-cvc-dark-blue">
                              O valor do auxílio internet será creditado em sua conta em <strong>1 dia útil</strong> após a ativação do sistema.
                            </p>
                          </div>
                        </div>
                      </div>

                      
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="mb-6 text-center">
                    <Button 
                      onClick={proceedToReady}
                      className="bg-cvc-blue hover:bg-cvc-blue/90 text-white font-semibold px-8 py-3 text-lg"
                    >
                      Calcular Custos e Prosseguir
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* System Ready */}
          {currentStep === 'ready' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Sistema Pronto</h3>
                <p className="text-gray-600">Configuração concluída com sucesso</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-1">Portal de Vendas Ativo</h4>
                <p className="text-sm text-green-700">
                  Sistema configurado e pronto para vendas
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <Button 
                  onClick={() => window.open('https://portal.cvc.com.br', '_blank')}
                  className="bg-cvc-blue hover:bg-blue-700 text-cvc-yellow font-semibold px-8 py-3 text-lg mb-4"
                >
                  Acessar Portal de Vendas
                </Button>
                
                <div className="border-t border-gray-200 pt-4">
                  <Button 
                    onClick={() => setLocation("/anuidade")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg"
                  >
                    Confirmar Configuração
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}