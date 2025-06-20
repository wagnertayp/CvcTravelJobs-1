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
    <section className="bg-cvc-blue">
      <div className="max-w-7xl mx-auto px-6 py-4 pt-[9px] pb-[9px] text-[15px]">
        <nav className="flex items-center gap-3">
          <ChevronRight className="h-6 w-6 text-white" />
          <div>
            <h1 className="text-white font-semibold text-[18px]">{currentPage}</h1>
            <p className="text-white/80 text-[13px]">CVC Agentes</p>
          </div>
        </nav>
      </div>
    </section>
  );
}