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
    <section className="bg-gray-50 border-b border-gray-200 py-3 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm">
          <div className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{currentPage}</span>
        </nav>
      </div>
    </section>
  );
}