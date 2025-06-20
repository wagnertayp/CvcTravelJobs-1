import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/home";
import Regiao from "@/pages/regiao";
import IniciarTeste from "@/pages/iniciarteste";
import TesteCVC from "@/pages/teste-cvc";
import AgenciasProximas from "@/pages/agencias-proximas";
import ContaBancaria from "@/pages/conta-bancaria";
import Comissoes from "@/pages/comissoes";
import Beneficios from "@/pages/beneficios";
import SistemaDeVendas from "@/pages/sistema-de-vendas";
import Anuidade from "@/pages/anuidade";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also ensure document element is scrolled to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Set a small timeout to handle any delayed content loading
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    
    return () => clearTimeout(timeoutId);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/regiao" component={Regiao} />
        <Route path="/iniciarteste" component={IniciarTeste} />
        <Route path="/teste-cvc" component={TesteCVC} />
        <Route path="/agencias-proximas" component={AgenciasProximas} />
        <Route path="/conta-bancaria" component={ContaBancaria} />
        <Route path="/comissoes" component={Comissoes} />
        <Route path="/beneficios" component={Beneficios} />
        <Route path="/sistema-de-vendas" component={SistemaDeVendas} />
        <Route path="/anuidade" component={Anuidade} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
