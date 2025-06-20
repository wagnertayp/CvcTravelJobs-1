import { ChevronRight, Home } from "lucide-react";
import { useLocation } from "wouter";

const pageNames: Record<string, string> = {
  "/": "Seja um agente CVC",
  "/regiao": "Validação Regional",
  "/conta-bancaria": "Dados Bancários", 
  "/comissoes": "Sistema de Comissões",
  "/beneficios": "Benefícios",
  "/sistema-de-vendas": "Portal de Vendas",
  "/anuidade": "Anuidade CVC"
};

export default function Breadcrumb() {
  const [location] = useLocation();
  const currentPage = pageNames[location] || "Seja um agente CVC";
  
  return (
    <section className="bg-gradient-to-r from-cvc-blue to-cvc-dark-blue shadow-sm border-b-2 border-cvc-yellow/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group shadow-sm">
              <Home className="h-4 w-4 text-white group-hover:text-cvc-yellow transition-colors drop-shadow-sm" />
              <span className="text-white text-sm font-medium group-hover:text-cvc-yellow transition-colors drop-shadow-sm">Home</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-cvc-yellow drop-shadow-sm" />
              <div className="px-4 py-2 bg-cvc-yellow rounded-full shadow-md border border-cvc-yellow/20">
                <span className="text-cvc-blue font-semibold text-sm">{currentPage}</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 bg-cvc-yellow rounded-full animate-pulse shadow-sm"></div>
            <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
            <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-pulse delay-300 shadow-sm"></div>
          </div>
        </nav>
        
        {/* Progress indicator line */}
        <div className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden shadow-inner">
          <div className="h-full w-3/4 bg-gradient-to-r from-cvc-yellow via-cvc-yellow to-white/80 rounded-full animate-pulse shadow-sm"></div>
        </div>
      </div>
    </section>
  );
}