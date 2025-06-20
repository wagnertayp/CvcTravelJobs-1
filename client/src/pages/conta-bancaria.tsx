import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { CreditCard, CheckCircle, Copy, Link, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import ProgressiveChecklistLoader from "@/components/progressive-checklist-loader";

export default function ContaBancaria() {
  const [, setLocation] = useLocation();
  const [showBankSelection, setShowBankSelection] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankData, setBankData] = useState({
    banco: "",
    agencia: "",
    conta: "",
    chavePix: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [personalLink, setPersonalLink] = useState("");
  const [packageExample, setPackageExample] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("MARINA SANTOS");
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [tempBankData, setTempBankData] = useState<any>(null);

  const banks = [
    { 
      id: 'bb', 
      name: 'Banco do Brasil', 
      logo: 'https://logopng.com.br/logos/banco-do-brasil-5.png'
    },
    { 
      id: 'bradesco', 
      name: 'Bradesco', 
      logo: 'https://i.postimg.cc/wvsbvcXC/bra-logo-1.jpg'
    },
    { 
      id: 'itau', 
      name: 'Itaú', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Ita%C3%BA_Unibanco_logo_2023.svg/2048px-Ita%C3%BA_Unibanco_logo_2023.svg.png'
    },
    { 
      id: 'santander', 
      name: 'Santander', 
      logo: 'https://www.santander.com.br/mfe-home-header/assets/img/appsantander.svg'
    },
    { 
      id: 'nubank', 
      name: 'Nubank', 
      logo: 'https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png'
    },
    { 
      id: 'inter', 
      name: 'Inter', 
      logo: 'https://images.seeklogo.com/logo-png/47/2/banco-inter-logo-png_seeklogo-473118.png'
    },
    { 
      id: 'pix', 
      name: 'PIX', 
      logo: 'https://img.icons8.com/fluent/512/pix.png'
    }
  ];

  useEffect(() => {
    // Get beneficiary name from CPF data
    const cpfData = sessionStorage.getItem('cpfData');
    if (cpfData) {
      const parsedData = JSON.parse(cpfData);
      setBeneficiaryName(parsedData.nome.toUpperCase());
    }

    // Generate personal link and package example
    const generatePersonalLink = () => {
      const username = "agente" + Math.floor(Math.random() * 1000);
      const token = Math.random().toString(36).substring(2, 8);
      setPersonalLink(`www.cvc.com.br/${username}-${token}`);
    };
    const packages = ["cancun-all-inclusive", "fernando-noronha-completo", "europa-15-dias", "disney-orlando"];
    setPackageExample(packages[Math.floor(Math.random() * packages.length)]);
    generatePersonalLink();
  }, []);

  const handleBankSelection = (bankId: string) => {
    setSelectedBank(bankId);
    const selectedBankData = banks.find(b => b.id === bankId);
    setBankData({...bankData, banco: selectedBankData?.name || ""});
    setShowBankSelection(false);
  };

  const showLoadingAndNavigate = (phase: string, destination: string) => {
    setIsNavigationLoading(true);
    setLoadingPhase(phase);
    setTimeout(() => {
      setIsNavigationLoading(false);
      setLocation(destination);
    }, 2000);
  };

  const handleBankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the form data temporarily and show confirmation modal
    setTempBankData({
      ...bankData,
      selectedBank,
      bankName: banks.find(b => b.id === selectedBank)?.name
    });
    setShowConfirmationModal(true);
  };

  const handleConfirmData = async () => {
    setIsLoading(true);
    setShowConfirmationModal(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success state
      console.log("Dados bancários salvos:", tempBankData);
      
      // Navigate to commissions after bank setup
      showLoadingAndNavigate('Carregando sistema de comissões...', '/comissoes');
    } catch (error) {
      console.error("Erro ao salvar dados bancários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuração de Recebimento</h1>
          <p className="text-gray-600">Configure onde deseja receber suas comissões</p>
        </div>

        {/* Configuração Bancária */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Dados Bancários</h2>
            <p className="text-sm text-gray-600">Selecione um dos bancos parceiros e configure os dados para recebimento</p>
          </div>

          {!selectedBank ? (
            <>
              {!showBankSelection ? (
                <Button
                  onClick={() => setShowBankSelection(true)}
                  className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
                >
                  Selecionar Banco
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {banks.map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => handleBankSelection(bank.id)}
                        className="p-3 border border-gray-200 rounded-lg hover:border-cvc-blue hover:bg-blue-50 transition-all duration-200 text-center"
                      >
                        <div className="h-8 w-8 mx-auto mb-2 flex items-center justify-center">
                          <img 
                            src={bank.logo} 
                            alt={bank.name}
                            className="max-h-6 max-w-8 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="text-xs font-medium text-gray-900">{bank.name}</div>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setShowBankSelection(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={banks.find(b => b.id === selectedBank)?.logo} 
                  alt={banks.find(b => b.id === selectedBank)?.name}
                  className="h-6 w-6 object-contain"
                />
                <span className="font-medium text-gray-900">
                  {banks.find(b => b.id === selectedBank)?.name}
                </span>
                <Button
                  onClick={() => {setSelectedBank(""); setBankData({banco: "", agencia: "", conta: "", chavePix: ""});}}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  Alterar
                </Button>
              </div>

              <form onSubmit={handleBankSubmit} className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 mb-1">Beneficiário</div>
                  <div className="text-gray-700">{beneficiaryName}</div>
                </div>

                {selectedBank === 'pix' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chave PIX *</label>
                    <Input
                      value={bankData.chavePix}
                      onChange={(e) => setBankData({...bankData, chavePix: e.target.value})}
                      placeholder="CPF, e-mail, telefone ou chave aleatória"
                      className="w-full text-gray-900"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agência</label>
                      <Input
                        value={bankData.agencia}
                        onChange={(e) => setBankData({...bankData, agencia: e.target.value})}
                        placeholder="0000"
                        className="w-full text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Conta *</label>
                      <Input
                        value={bankData.conta}
                        onChange={(e) => setBankData({...bankData, conta: e.target.value})}
                        placeholder="00000-0"
                        className="w-full text-gray-900"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Salvando...
                    </div>
                  ) : (
                    "Confirmar e prosseguir"
                  )}
                </Button>
              </form>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  Dados protegidos com criptografia SSL. Comissões são creditadas em até 1 dia útil após confirmação das vendas.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Próximos Passos do Onboarding */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Configuração da Conta</h2>
            <p className="text-sm text-gray-600">Configure sua conta bancária para receber comissões</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cvc-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Escolha sua Instituição</div>
                <div className="text-sm text-gray-600">Selecione seu banco ou PIX para recebimento das comissões</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cvc-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Dados Bancários</div>
                <div className="text-sm text-gray-600">Informe agência e conta ou chave PIX para transferências</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Próxima Fase</div>
                <div className="text-sm text-gray-600">Acesse o sistema de comissões e configure seus benefícios</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800 text-sm">Importante</span>
            </div>
            <p className="text-sm text-yellow-700">
              Após configurar sua conta, você terá acesso ao sistema completo de vendas e receberá seu link personalizado.
            </p>
          </div>
        </div>
      </div>
      {/* Professional Loading Screen */}
      {isNavigationLoading && (
        <div className="fixed inset-0 bg-cvc-blue flex items-center justify-center z-50">
          <div className="text-center">
            {/* CVC Logo Container */}
            <div className="mb-8">
              <div className="w-40 h-40 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <img 
                  src="https://i.postimg.cc/zvkTvTjZ/d2edd98a-82c3-4ca6-a4fc-328fe352a2a0-removalai-preview.png" 
                  alt="CVC Logo" 
                  className="h-20 w-auto"
                />
              </div>
              
              {/* Phase Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Concluindo Fase</h2>
                <p className="text-cvc-yellow font-medium text-lg">{loadingPhase}</p>
              </div>
              
              {/* Loading Animation */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              
              <p className="text-white text-sm">Aguarde um momento...</p>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cvc-yellow rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-cvc-blue" />
                </div>
                <h3 className="text-lg font-semibold text-cvc-blue">Dados Bancários</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">Confirme os dados bancários antes de prosseguir. Essas informações serão usadas para receber suas comissões e auxílios.</p>
              
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Beneficiário:</span>
                  <span className="text-sm font-medium text-gray-900">{beneficiaryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Instituição:</span>
                  <span className="text-sm font-medium text-gray-900">{tempBankData?.bankName}</span>
                </div>
                {tempBankData?.selectedBank === 'pix' ? (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Chave PIX:</span>
                    <span className="text-sm font-medium text-gray-900">{tempBankData?.chavePix}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Agência:</span>
                      <span className="text-sm font-medium text-gray-900">{tempBankData?.agencia || "Não informada"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conta:</span>
                      <span className="text-sm font-medium text-gray-900">{tempBankData?.conta}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleConfirmData}
                disabled={isLoading}
                className="w-full bg-cvc-blue text-white hover:bg-cvc-dark-blue"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Salvando...
                  </div>
                ) : (
                  "Confirmar e Continuar"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}