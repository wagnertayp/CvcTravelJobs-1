import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DollarSign, MessageCircle, ArrowDownToLine, TrendingUp, Users, Target, CheckCircle, Link, Copy, Calendar, FileText, CreditCard, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";

export default function Comissoes() {
  const [, setLocation] = useLocation();
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [balance, setBalance] = useState(2847.50);
  const [showLinkGenerated, setShowLinkGenerated] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  
  // Retrieve CPF data from localStorage
  const [cpfData, setCpfData] = useState<any>(null);
  
  useEffect(() => {
    const storedCpfData = localStorage.getItem('cpfData');
    if (storedCpfData) {
      setCpfData(JSON.parse(storedCpfData));
    }
  }, []);

  const getAgentName = () => {
    if (cpfData && cpfData.nome) {
      const names = cpfData.nome.split(' ');
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
        // Stop at the message with the button (index 5) and wait for user interaction
        if (prev === 5 && !showLinkGenerated) {
          return prev; // Don't advance until user clicks the button
        }
        
        if (prev < chatSimulation.length - 1) {
          return prev + 1;
        }
        
        // Reset the simulation
        setTimeout(() => {
          setChatMessages([]);
          setCurrentStep(0);
          setShowLinkGenerated(false);
        }, 3000);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showLinkGenerated]);

  useEffect(() => {
    if (currentStep < chatSimulation.length) {
      setChatMessages(chatSimulation.slice(0, currentStep + 1));
    }
    
    // Simulate commission being added to balance
    if (currentStep === chatSimulation.length - 1) {
      setTimeout(() => {
        setBalance(prev => prev + 480);
      }, 1000);
    }
  }, [currentStep]);

  const handleWithdraw = () => {
    setBalance(0);
  };

  const handleGenerateLink = () => {
    setShowLinkGenerated(true);
    // Add the link message immediately
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 500);
  };

  const handleCopyLink = () => {
    const link = 'www.cvc.com.br/agente789-xyz456/fernando-noronha-completo';
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const showLoadingAndNavigate = (phase: string, destination: string) => {
    setIsLoading(true);
    setLoadingPhase(phase);
    setTimeout(() => {
      setIsLoading(false);
      setLocation(destination);
    }, 2000);
  };

  const commissionTransactions = [
    { id: 1, date: '15/06/2025', client: 'Carlos Mendes', package: 'Fernando de Noronha 7 dias', value: 3200, commission: 480, status: 'Creditado' },
    { id: 2, date: '14/06/2025', client: 'Ana Silva', package: 'Gramado Romântico', value: 1800, commission: 270, status: 'Creditado' },
    { id: 3, date: '13/06/2025', client: 'Roberto Santos', package: 'Orlando Família', value: 8500, commission: 1275, status: 'Creditado' },
    { id: 4, date: '12/06/2025', client: 'Marina Costa', package: 'Cancún All-Inclusive', value: 4200, commission: 630, status: 'Creditado' },
    { id: 5, date: '11/06/2025', client: 'Pedro Oliveira', package: 'Buenos Aires Cultural', value: 2400, commission: 360, status: 'Creditado' },
    { id: 6, date: '10/06/2025', client: 'Julia Ferreira', package: 'Fortaleza Beach', value: 1900, commission: 285, status: 'Creditado' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Como Funcionam as Comissões</h1>
          <p className="text-gray-600">Entenda como você ganha dinheiro como Agente de Viagens CVC</p>
        </div>

        {/* Sistema de Comissões Premium */}
        <div className="w-full bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-200 p-4 md:p-8 mb-6 shadow-xl">
          {/* Cabeçalho Premium */}
          <div className="text-center border-b-2 border-gray-300 pb-8 mb-8">
            <div className="mb-6">
              <img 
                src="https://i.postimg.cc/jSfHy2yL/d2edd98a-82c3-4ca6-a4fc-328fe352a2a0-removalai-preview.png" 
                alt="CVC Logo" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-cvc-blue" />
              </div>
              <h2 className="text-xl font-bold text-cvc-blue">Sistema de Comissões</h2>
            </div>
            <p className="text-gray-600 text-sm">Estrutura de remuneração para agentes CVC</p>
          </div>

          {/* Sistema de Clientes Automático */}
          <div className="bg-white rounded-lg border border-cvc-blue/20 p-6 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cvc-yellow rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-cvc-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-cvc-blue">Sistema de Clientes Automático</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-cvc-yellow/10 rounded-lg">
                <div className="w-2 h-2 bg-cvc-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm text-gray-700 font-medium mb-1">Clientes Direcionados Automaticamente</div>
                  <div className="text-xs text-gray-600">Receba diariamente clientes interessados em comprar pacotes de viagem através do nosso sistema de distribuição</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-cvc-yellow/10 rounded-lg">
                <div className="w-2 h-2 bg-cvc-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm text-gray-700 font-medium mb-1">Sem Necessidade de Divulgação</div>
                  <div className="text-xs text-gray-600">Não precisa procurar clientes ou fazer propaganda - eles chegam até você prontos para fechar negócio</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-cvc-yellow/10 rounded-lg">
                <div className="w-2 h-2 bg-cvc-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm text-gray-700 font-medium mb-1">Atendimento Focado em Vendas</div>
                  <div className="text-xs text-gray-600">Concentre-se apenas em converter clientes qualificados que já demonstraram interesse em viajar com a CVC.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Explicação das Comissões */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg border border-cvc-blue/20 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cvc-yellow rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-cvc-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-cvc-blue">Destinos Nacionais</h3>
                  <p className="text-sm text-gray-600">Viagens dentro do Brasil</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-cvc-yellow/10 rounded-lg">
                  <span className="text-sm text-gray-700">Pacotes Básicos</span>
                  <span className="font-bold text-cvc-blue">7-9%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cvc-yellow/10 rounded-lg">
                  <span className="text-sm text-gray-700">Pacotes Premium</span>
                  <span className="font-bold text-cvc-blue">10-12%</span>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Comissões variam conforme categoria do hotel e serviços inclusos
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-cvc-blue/20 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cvc-yellow rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-cvc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-cvc-blue">Destinos Internacionais</h3>
                  <p className="text-sm text-gray-600">Viagens para o exterior</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-cvc-yellow/10 rounded-lg">
                  <span className="text-sm text-gray-700">América do Sul</span>
                  <span className="font-bold text-cvc-blue">10-12%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cvc-yellow/10 rounded-lg">
                  <span className="text-sm text-gray-700">Europa & EUA</span>
                  <span className="font-bold text-cvc-blue">12-15%</span>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Maiores percentuais para destinos de longa distância
                </div>
              </div>
            </div>
          </div>

          {/* Fatores de Performance */}
          <div className="bg-white rounded-lg border border-cvc-blue/20 p-6 shadow-sm mb-8">
            <h3 className="font-semibold text-cvc-blue mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cvc-blue" />
              Fatores que Aumentam sua Comissão
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-cvc-blue" />
                </div>
                <div className="font-medium text-cvc-blue mb-1">Volume de Vendas</div>
                <div className="text-sm text-gray-600">Meta mensal de R$ 15.000 garante percentual máximo</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-cvc-blue" />
                </div>
                <div className="font-medium text-cvc-blue mb-1">Atendimento Premium</div>
                <div className="text-sm text-gray-600">Avaliação 4.8+ dos clientes libera bônus adicional</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-cvc-blue" />
                </div>
                <div className="font-medium text-cvc-blue mb-1">Consistência</div>
                <div className="text-sm text-gray-600">3 meses consecutivos acima da meta = +2% extra</div>
              </div>
            </div>
          </div>

          {/* Cronograma de Pagamento */}
          <div className="bg-cvc-yellow/10 rounded-lg border border-cvc-yellow/30 p-6">
            <h3 className="font-semibold text-cvc-blue mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-cvc-blue" />
              Cronograma de Pagamento
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-cvc-blue/20">
                <div className="font-medium text-cvc-blue mb-1">Processamento</div>
                <div className="text-sm text-gray-600">Comissão calculada automaticamente após confirmação do pagamento</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-cvc-blue/20">
                <div className="font-medium text-cvc-blue mb-1">Aprovação</div>
                <div className="text-sm text-gray-600">Análise e liberação em até 1 dia útil para bancos parceiros e instantâneo para comissões via PIX.</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-cvc-blue/20">
                <div className="font-medium text-cvc-blue mb-1">Crédito</div>
                <div className="text-sm text-gray-600">Depósito na conta bancária cadastrada</div>
              </div>
            </div>
          </div>

          {/* Botão de Ação Premium */}
          <div className="mt-8 text-center">
            <Button 
              onClick={() => showLoadingAndNavigate('Carregando seus benefícios...', '/beneficios')}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue shadow-lg"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Prosseguir
            </Button>
          </div>
        </div>



        {/* Processo de Pagamento */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Como Funciona o Pagamento</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cvc-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Cliente Finaliza Compra</div>
                <div className="text-sm text-gray-600">Sua comissão é calculada automaticamente no momento da venda</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cvc-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Confirmação da Viagem</div>
                <div className="text-sm text-gray-600">Comissão é liberada após confirmação do pagamento do cliente</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Recebimento</div>
                <div className="text-sm text-gray-600">Valor creditado em sua conta em até 1 dia útil</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">Importante</span>
            </div>
            <p className="text-sm text-yellow-700">O recebimento funciona de acordo com o método escolhido. As comissões via PIX são repassadas de forma instantânea após venda realizada.</p>
          </div>
        </div>


      </div>
      {/* Professional Loading Screen */}
      {isLoading && (
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
    </div>
  );
}