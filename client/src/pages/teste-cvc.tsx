import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, CheckCircle, CheckCircle2, XCircle, ChevronRight, Clock, User, Package } from "lucide-react";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 2,
    text: 'O que significa "All Inclusive" em um pacote turístico?',
    options: [
      'Apenas café da manhã incluso',
      'Passagens incluídas',
      'Todas as refeições, bebidas e serviços inclusos no hotel',
      'Transporte local incluso'
    ],
    correct: 2
  },
  {
    id: 3,
    text: 'Se um cliente deseja visitar as Cataratas do Iguaçu, ele deve viajar para:',
    options: [
      'Foz do Iguaçu — PR',
      'Bonito — MS',
      'Gramado — RS',
      'Fortaleza — CE'
    ],
    correct: 0
  },
  {
    id: 4,
    text: 'Qual desses documentos é obrigatório para entrada nos países da América Latina?',
    options: [
      'Passaporte',
      'Visto de turismo',
      'Carteira de vacinação',
      'RG (em bom estado, com menos de 10 anos de emissão)'
    ],
    correct: 3
  },
  {
    id: 5,
    text: 'Um cliente quer viajar para Orlando, nos Estados Unidos. Além do passaporte, ele precisará:',
    options: [
      'CPF atualizado',
      'Visto americano válido',
      'Visto europeu',
      'Carteira de vacinação'
    ],
    correct: 1
  }
];

export default function TesteCVC() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [phase, setPhase] = useState<'quiz' | 'practical' | 'products' | 'completed'>('quiz');
  const [practicalAnswer, setPracticalAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showPracticalResult, setShowPracticalResult] = useState(false);
  const [practicalEvaluation, setPracticalEvaluation] = useState('');
  const [productAnswers, setProductAnswers] = useState<string[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Scroll to top when moving to next question
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setShowResult(true);
    }
  };

  const handlePracticalSubmit = () => {
    if (practicalAnswer.trim().length < 15) return;
    
    setIsEvaluating(true);
    
    // Simulate AI evaluation with progressive feedback
    setTimeout(() => {
      const evaluation = `O RH da CVC analisou sua resposta e identificou pontos positivos em sua abordagem de atendimento. 
      
Sua resposta: "${practicalAnswer}"

Avaliação: Você demonstrou compreensão adequada sobre a importância de fazer perguntas específicas para entender as necessidades do cliente. Pontos como orçamento, preferências de hospedagem e datas são fundamentais para um bom atendimento.

Resultado: APROVADO - Suas habilidades de atendimento atendem aos padrões da CVC.`;
      
      setPracticalEvaluation(evaluation);
      setIsEvaluating(false);
      setShowPracticalResult(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 4000);
  };

  const handleProductToggle = (service: string) => {
    setProductAnswers(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleProductsSubmit = () => {
    if (productAnswers.length === 0) return;
    setPhase('completed');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  // Get user data from localStorage
  const validatedCPFData = JSON.parse(localStorage.getItem('validatedCPFData') || '{}');
  const userFirstName = validatedCPFData.nome ? validatedCPFData.nome.split(' ')[0] : 'Candidato';

  if (showPracticalResult) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-yellow/20 rounded-full mt-[-9px] mb-[-9px]">
              <CheckCircle2 className="h-8 w-8 text-cvc-blue" />
            </div>
            <h1 className="font-bold text-cvc-blue mb-3 text-[24px]">Avaliação do Corpo de Recursos Humanos da CVC</h1>
            <p className="text-cvc-dark-blue mb-6 text-[16px]">Análise completa do seu atendimento prático</p>
            
            <div className="bg-cvc-blue/5 border border-cvc-blue/20 rounded-lg p-6 mb-6 max-w-3xl mx-auto">
              <div className="bg-cvc-blue border-l-4 border-cvc-yellow p-4 px-6 sm:px-8 rounded-lg mb-4 ml-[-13px] mr-[-13px]">
                <h3 className="font-semibold text-cvc-yellow mb-3">Resultado da Análise</h3>
                <div className="text-white text-sm leading-relaxed whitespace-pre-line ml-[-10px] mr-[-10px]">
                  {practicalEvaluation}
                </div>
              </div>
              
              <div className="bg-cvc-yellow/10 border border-cvc-blue/20 rounded-lg p-4 mb-4 pl-[24px] pr-[24px]">
                <h4 className="font-semibold text-cvc-blue mb-2 text-left">Próxima Fase: Conhecimentos de Produtos</h4>
                <ul className="text-sm text-cvc-dark-blue space-y-1 text-left">
                  <li>• Demonstre conhecimento sobre serviços da CVC</li>
                  <li>• Identifique produtos e soluções oferecidas</li>
                  <li>• Mostre familiaridade com o portfólio da empresa</li>
                  <li>• Complete a avaliação final de conhecimentos</li>
                </ul>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p>Conhecimentos Gerais ✓ → Atendimento Prático ✓ → Produtos CVC</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setShowPracticalResult(false);
                setPhase('products');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue"
            >
              Continuar para Produtos CVC
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'products') {
    const serviceOptions = [
      'Passagens aéreas',
      'Hospedagem', 
      'Seguro viagem',
      'Cruzeiros',
      'Pacotes rodoviários e aéreos',
      'Aluguel de carros',
      'Ingressos para parques'
    ];

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-[0px] pb-[0px]">
          <div className="text-center pt-[0px] pb-[0px] mt-[10px] mb-[10px]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-blue/10 rounded-full mt-[-2px] mb-[-2px]">
              <Package className="h-8 w-8 text-cvc-blue" />
            </div>
            <h1 className="font-bold text-cvc-blue text-[24px] mt-[-2px] mb-[-2px] pl-[0px] pr-[0px] pt-[0px] pb-[0px]">Conhecimentos de Produtos CVC</h1>
            <p className="text-cvc-dark-blue text-[14px]">Demonstre seus conhecimentos sobre os serviços da CVC</p>
          </div>

          <div className="bg-white border border-cvc-blue/20 rounded-lg p-8">
            <div className="mb-6">
              <h3 className="font-bold text-cvc-blue text-lg mb-4">Quais dos serviços abaixo podem ser vendidos por uma agência CVC?</h3>
              <p className="text-cvc-dark-blue text-sm bg-cvc-yellow/10 p-4 rounded-lg mt-[14px] mb-[14px] pl-[1px] pr-[1px] pt-[4px] pb-[4px]">
                Assinale todos que se aplicam
              </p>
              
              <div className="space-y-3">
                {serviceOptions.map((service, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      productAnswers.includes(service)
                        ? 'border-cvc-blue bg-cvc-yellow/10'
                        : 'border-gray-200 hover:border-cvc-blue/50 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={productAnswers.includes(service)}
                      onChange={() => handleProductToggle(service)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                      productAnswers.includes(service)
                        ? 'bg-cvc-blue border-cvc-blue'
                        : 'border-gray-300'
                    }`}>
                      {productAnswers.includes(service) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      productAnswers.includes(service) ? 'text-cvc-blue' : 'text-gray-700'
                    }`}>
                      {service}
                    </span>
                  </label>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                {productAnswers.length} de {serviceOptions.length} serviços selecionados
              </div>
            </div>

            <Button
              onClick={handleProductsSubmit}
              disabled={productAnswers.length === 0}
              className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue disabled:opacity-50"
            >
              Finalizar Teste
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'completed') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center pt-[-3px] pb-[-3px] mt-[-13px] mb-[-13px]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mt-[8px] mb-[8px]">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-bold text-cvc-blue mb-2 text-[24px]">Parabéns, {userFirstName}!</h1>
            <p className="text-cvc-dark-blue text-[14px]">Você foi aprovado no teste de conhecimentos gerais e está apto para continuar.</p>
          </div>

          <div className="bg-white border border-cvc-blue/20 rounded-lg p-8 text-center pt-[19px] pb-[19px] mt-[37px] mb-[37px]">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-cvc-yellow/10 p-6 rounded-lg">
                <h3 className="font-bold text-cvc-blue mb-2">Fase 1 - Conhecimentos Gerais</h3>
                <div className="text-2xl font-bold text-cvc-blue">{score}%</div>
                <p className="text-sm text-cvc-dark-blue">Aprovado</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-cvc-blue mb-2">Fase 2 - Cenário Prático</h3>
                <div className="text-2xl font-bold text-green-600">✓</div>
                <p className="text-sm text-cvc-dark-blue">Aprovado</p>
              </div>
              <div className="bg-cvc-blue/10 p-6 rounded-lg">
                <h3 className="font-bold text-cvc-blue mb-2">Fase 3 - Produtos CVC</h3>
                <div className="text-2xl font-bold text-cvc-blue">{productAnswers.length}/7</div>
                <p className="text-sm text-cvc-dark-blue">Aprovado</p>
              </div>
            </div>

            <div className="bg-cvc-blue/5 p-6 rounded-lg mt-[12px] mb-[12px] pt-[0px] pb-[0px]">
              <div className="bg-cvc-blue border-l-4 border-cvc-yellow p-6 px-8 sm:px-12 rounded-lg pl-[32px] pr-[32px] ml-[-43px] mr-[-43px] mt-[24px] mb-[24px] pt-[17px] pb-[17px]">
                <h3 className="font-semibold text-cvc-yellow mb-3">Resultado Final</h3>
                <p className="text-white text-sm font-medium leading-relaxed">
                  Você demonstrou conhecimento adequado sobre turismo, habilidades práticas de atendimento e conhecimento dos produtos CVC.
                  Sua aprovação confirma que você está preparado para atuar como Agente de Viagens CVC.
                </p>
              </div>
              
              <div className="bg-cvc-yellow/10 border border-cvc-blue/20 rounded-lg p-4 mb-4 ml-[-35px] mr-[-35px]">
                <h4 className="font-semibold text-cvc-blue mb-2 text-left">Próxima Fase: Seleção de Agência</h4>
                <ul className="text-sm text-cvc-dark-blue space-y-1 text-left">
                  <li>• Visualizar agências CVC próximas à sua região</li>
                  <li>• Conhecer sua futura equipe de trabalho</li>
                  <li>• Ver estimativas de comissão por agência</li>
                  <li>• Escolher onde você trabalhará em home office</li>
                </ul>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p>Teste de Conhecimentos Concluído</p>
                <p>Seleção de Agência → Dados Bancários → Benefícios</p>
              </div>
            </div>

            <Button
              onClick={() => setLocation('/agencias-proximas')}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue"
            >Buscar Agências CVC Próximas</Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'practical') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-[0px] pb-[0px]">
          <div className="text-center pt-[0px] pb-[0px] mt-[10px] mb-[10px]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-yellow/20 rounded-full mb-4">
              <User className="h-8 w-8 text-cvc-blue" />
            </div>
            <h1 className="font-bold text-cvc-blue mb-2 text-[24px]">Atendimento Prático</h1>
            <p className="text-cvc-dark-blue text-[14px]">Demonstre suas habilidades de 
            atendimento ao cliente</p>
          </div>

          <div className="bg-white border border-cvc-blue/20 rounded-lg p-8">
            <div className="bg-cvc-yellow/10 border-l-4 border-cvc-blue p-6 rounded-lg mb-6 ml-[-11px] mr-[-11px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-blue rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-cvc-blue text-lg">Cenário de Atendimento</h3>
              </div>
              <p className="text-cvc-dark-blue font-medium">
                Família de 4 pessoas busca pacote para o Nordeste: "pé na areia", piscina, café da manhã, área infantil, saída de São Paulo.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-cvc-blue font-semibold mb-3">
                Quais perguntas você faria para entender melhor as necessidades dessa família?
              </label>
              <Textarea
                value={practicalAnswer}
                onChange={(e) => setPracticalAnswer(e.target.value)}
                placeholder="Digite sua resposta aqui... (mínimo 15 caracteres)"
                className="min-h-[200px] border-cvc-blue/30 focus:border-cvc-blue"
                disabled={isEvaluating}
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${practicalAnswer.length >= 15 ? 'text-green-600' : 'text-gray-500'}`}>
                  {practicalAnswer.length}/15 caracteres mínimos
                </span>
                {isEvaluating && (
                  <div className="flex items-center gap-2 text-cvc-blue">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Avaliando resposta...</span>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handlePracticalSubmit}
              disabled={practicalAnswer.trim().length < 15 || isEvaluating}
              className="w-full bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue disabled:opacity-50"
            >
              {isEvaluating ? 'Avaliando...' : 'Enviar Resposta'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-yellow/20 rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-cvc-blue" />
            </div>
            <h1 className="text-3xl font-bold text-cvc-blue mb-3">Primeira Fase Concluída!</h1>
            <p className="text-cvc-dark-blue text-lg mb-6">Você acertou {correctAnswers} de {questions.length} questões ({score}%)</p>
            
            <div className="bg-cvc-blue/5 border border-cvc-blue/20 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <div className="bg-cvc-blue border-l-4 border-cvc-yellow p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-cvc-yellow mb-2">Aprovado para a Segunda Fase</h3>
                <p className="text-white text-sm">
                  Seus conhecimentos gerais de turismo foram validados com sucesso. 
                  Agora você testará suas habilidades práticas de atendimento.
                </p>
              </div>
              
              <div className="bg-cvc-yellow/10 border border-cvc-blue/20 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-cvc-blue mb-2">Próxima Fase: Atendimento Prático</h4>
                <ul className="text-sm text-cvc-dark-blue space-y-1">
                  <li>• Cenário real de atendimento ao cliente</li>
                  <li>• Demonstre suas habilidades de comunicação</li>
                  <li>• Responda como abordaria situações práticas</li>
                  <li>• Mostre seu conhecimento em vendas de viagens</li>
                </ul>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p>Conhecimentos Gerais ✓ → Atendimento Prático → Produtos CVC</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setPhase('practical');
                setShowResult(false);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue"
            >
              Iniciar Teste Prático
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      <div className="max-w-5xl mx-auto px-6 py-16 pt-[13px] pb-[13px]">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-blue/10 rounded-full pt-[0px] pb-[0px] mt-[-2px] mb-[-2px]">
            <BookOpen className="h-8 w-8 text-cvc-blue" />
          </div>
          <h1 className="font-bold text-cvc-blue text-[24px] mt-[0px] mb-[0px] pt-[0px] pb-[0px]">Teste de Conhecimentos CVC</h1>
          <p className="text-cvc-dark-blue font-medium text-[14px]">Conhecimentos Gerais de Turismo</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-cvc-dark-blue mb-3">
            <span className="font-medium">Questão {currentQuestion + 1} de {questions.length}</span>
            <span className="font-bold text-cvc-blue">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-sm">
            <div 
              className="bg-cvc-blue h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white border border-cvc-blue/20 rounded-xl p-10 shadow-lg">
          <h2 className="font-bold text-cvc-blue text-center mt-[-10px] mb-[-10px] ml-[-27px] mr-[-27px] text-[18px]">
            {question.text}
          </h2>
          
          <p className="text-base text-cvc-dark-blue font-medium mb-8 text-center bg-cvc-yellow/10 p-4 rounded-lg">
            Selecione uma alternativa para continuar
          </p>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.01] ${
                  selectedAnswer === index
                    ? 'border-cvc-blue bg-cvc-yellow/10 shadow-md'
                    : 'border-gray-200 hover:border-cvc-blue/50 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`min-w-[32px] h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    selectedAnswer === index
                      ? 'bg-cvc-blue shadow-md'
                      : 'bg-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`font-medium text-base leading-normal ${
                    selectedAnswer === index ? 'text-cvc-blue' : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Teste'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}