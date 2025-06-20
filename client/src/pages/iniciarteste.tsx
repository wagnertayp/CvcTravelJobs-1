import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, CheckCircle, User, Package, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import ProgressiveChecklistLoader from "@/components/progressive-checklist-loader";

export default function IniciarTeste() {
  const [, setLocation] = useLocation();
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  const showLoadingAndNavigate = (title: string, path: string) => {
    setIsNavigationLoading(true);
  };

  // Get user data from localStorage
  const validatedCPFData = JSON.parse(localStorage.getItem('validatedCPFData') || '{}');
  const userFirstName = validatedCPFData.nome ? validatedCPFData.nome.split(' ')[0] : 'Candidato';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-yellow/20 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-cvc-blue" />
          </div>
          <h1 className="text-3xl font-bold text-cvc-blue mb-2">Teste de Conhecimentos CVC</h1>
          <p className="text-cvc-dark-blue text-lg">Olá, {userFirstName}! Prepare-se para demonstrar seus conhecimentos</p>
        </div>

        <div className="bg-cvc-blue/5 border border-cvc-blue/20 rounded-lg p-6 mb-6">
          <div className="bg-cvc-blue border-l-4 border-cvc-yellow p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-cvc-yellow mb-2">Sobre o Teste de Avaliação</h3>
            <p className="text-white text-sm leading-relaxed">
              O teste é composto por 3 fases que avaliam diferentes aspectos necessários para ser um Agente de Viagens CVC.
              Cada fase foi desenvolvida para identificar candidatos qualificados e comprometidos com a excelência no atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-cvc-blue/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Fase 1</h4>
              </div>
              <h5 className="font-medium text-cvc-dark-blue mb-2">Conhecimentos Gerais de Turismo</h5>
              <p className="text-sm text-gray-600">4 questões sobre destinos, documentação e conceitos básicos do turismo</p>
            </div>

            <div className="bg-white border border-cvc-blue/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Fase 2</h4>
              </div>
              <h5 className="font-medium text-cvc-dark-blue mb-2">Atendimento Prático</h5>
              <p className="text-sm text-gray-600">Cenário real onde você demonstra habilidades de atendimento ao cliente</p>
            </div>

            <div className="bg-white border border-cvc-blue/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow/20 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Fase 3</h4>
              </div>
              <h5 className="font-medium text-cvc-dark-blue mb-2">Produtos CVC</h5>
              <p className="text-sm text-gray-600">Conhecimento sobre os serviços e produtos oferecidos pela CVC</p>
            </div>
          </div>

          <div className="bg-cvc-yellow/10 border border-cvc-blue/20 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-cvc-blue mb-3">Informações Importantes:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-cvc-blue mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cvc-dark-blue">Tempo de Realização</p>
                  <p className="text-xs text-gray-600">Aproximadamente 10-15 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 text-cvc-blue mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cvc-dark-blue">Critério de Aprovação</p>
                  <p className="text-xs text-gray-600">Desempenho satisfatório em todas as fases</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cvc-blue mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cvc-dark-blue">Tentativas</p>
                  <p className="text-xs text-gray-600">Uma única tentativa por candidato</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-cvc-blue mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cvc-dark-blue">Progressão</p>
                  <p className="text-xs text-gray-600">Aprovação leva à seleção de agência</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Após completar o teste, você prosseguirá para a seleção de agência e configuração bancária</p>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => showLoadingAndNavigate('Carregando teste de conhecimentos...', '/teste-cvc')}
            className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue flex items-center gap-2 mx-auto"
          >
            Iniciar Teste de Conhecimentos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progressive Checklist Loading Screen */}
      {isNavigationLoading && (
        <ProgressiveChecklistLoader 
          title="Carregando Teste de Conhecimentos"
          steps={[
            "Verificando dados do candidato",
            "Configurando sistema de avaliação", 
            "Carregando questões personalizadas",
            "Preparando interface de teste",
            "Iniciando primeira fase do teste"
          ]}
          onComplete={() => {
            setIsNavigationLoading(false);
            setLocation('/teste-cvc');
          }}
        />
      )}
    </div>
  );
}