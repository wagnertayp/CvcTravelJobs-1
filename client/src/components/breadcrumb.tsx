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
    <section className="bg-cvc-blue relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <pattern id="sophisticatedPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="0,0 50,25 100,0 100,50 50,75 0,50" fill="white" opacity="0.15"/>
                <circle cx="25" cy="25" r="8" fill="white" opacity="0.1"/>
                <circle cx="75" cy="75" r="6" fill="white" opacity="0.08"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sophisticatedPattern)"/>
          </svg>
        </div>
        
        {/* Geometric overlay */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-24 h-full bg-gradient-to-r from-white/3 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 pt-[9px] pb-[9px] text-[15px] relative z-10">
        <nav className="flex items-center gap-3">
          <div className="relative">
            <ChevronRight className="h-6 w-6 text-white drop-shadow-sm" />
            <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm -z-10"></div>
          </div>
          <div>
            <h1 className="text-white font-semibold text-[18px] drop-shadow-sm">{currentPage}</h1>
            <p className="text-white/80 text-[13px]">CVC -Inscrição de Agentes</p>
          </div>
        </nav>
      </div>
    </section>
  );
}