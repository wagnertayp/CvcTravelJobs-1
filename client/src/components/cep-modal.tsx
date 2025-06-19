import { useState } from "react";
import { useLocation } from "wouter";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CepModal({ isOpen, onClose }: CepModalProps) {
  const [, setLocation] = useLocation();
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatCep = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara XXXXX-XXX
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setError("");
  };

  const validateCep = (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    return cleanCep.length === 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCep(cep)) {
      setError("Por favor, insira um CEP válido com 8 dígitos");
      return;
    }

    setIsLoading(true);
    
    try {
      // Consultar OpenCEP para obter dados reais do endereço
      const response = await fetch(`https://opencep.com/v1/${cep.replace(/\D/g, '')}`);
      const addressData = await response.json();
      
      if (addressData.cep) {
        // Salvar dados do CEP no localStorage
        const cepData = {
          cep: cep,
          cidade: addressData.localidade,
          estado: addressData.uf,
          bairro: addressData.bairro || '',
          logradouro: addressData.logradouro || ''
        };
        localStorage.setItem('cepData', JSON.stringify(cepData));
        console.log("CEP enviado:", cep);
        console.log("Dados do endereço:", cepData);
        
        setIsLoading(false);
        onClose();
        setLocation("/regiao");
      } else {
        setError("CEP não encontrado. Verifique o código postal inserido.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao validar CEP:", error);
      setError("Erro ao validar CEP. Tente novamente.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cvc-blue rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Seja um Agente CVC</h2>
              <p className="text-sm text-gray-600">Informe seu CEP para continuar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cep" className="block text-sm font-semibold text-gray-700 mb-2">
                CEP *
              </label>
              <Input
                id="cep"
                type="text"
                value={cep}
                onChange={handleCepChange}
                placeholder="00000-000"
                maxLength={9}
                className={`w-full px-4 py-3 border rounded-lg text-lg text-gray-900 placeholder-gray-400 ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-cvc-blue'
                }`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Precisamos do seu CEP para verificar a disponibilidade na sua região
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !cep}
                className="flex-1 bg-cvc-blue text-white py-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Verificando...
                  </div>
                ) : (
                  "Continuar"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center">
            Seus dados são tratados com total segurança e privacidade
          </p>
        </div>
      </div>
    </div>
  );
}