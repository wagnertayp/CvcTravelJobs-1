import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, CheckCircle, XCircle, ChevronRight, Clock, User } from "lucide-react";
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
    text: 'Qual desses documentos é obrigatório para entrada nos países do Mercosul?',
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
  const [phase, setPhase] = useState<'quiz' | 'practical' | 'completed'>('quiz');
  const [practicalAnswer, setPracticalAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

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
    } else {
      setShowResult(true);
      // Auto advance to practical phase after 3 seconds
      setTimeout(() => {
        setPhase('practical');
        setShowResult(false);
      }, 3000);
    }
  };

  const handlePracticalSubmit = () => {
    if (practicalAnswer.trim().length < 50) return;
    
    setIsEvaluating(true);
    // Simulate real-time evaluation
    setTimeout(() => {
      setIsEvaluating(false);
      setPhase('completed');
    }, 4000);
  };

  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  // Get user data from localStorage
  const validatedCPFData = JSON.parse(localStorage.getItem('validatedCPFData') || '{}');
  const userFirstName = validatedCPFData.nome ? validatedCPFData.nome.split(' ')[0] : 'Candidato';

  if (phase === 'completed') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-cvc-blue mb-2">Parabéns, {userFirstName}!</h1>
            <p className="text-cvc-dark-blue text-lg">Você foi aprovado no teste de conhecimentos</p>
          </div>

          <div className="bg-white border border-cvc-blue/20 rounded-lg p-8 text-center">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            </div>

            <div className="bg-cvc-blue/5 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-cvc-blue mb-2">Resultado Final</h3>
              <p className="text-cvc-dark-blue">
                Você demonstrou conhecimento adequado sobre turismo e habilidades práticas de atendimento.
                Está qualificado para prosseguir com o cadastro bancário.
              </p>
            </div>

            <Button
              onClick={() => setLocation('/conta-bancaria')}
              className="bg-cvc-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue"
            >
              Prosseguir para Configuração Bancária
            </Button>
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
            <h1 className="font-bold text-cvc-blue mb-2 text-[24px]">Fase 2 - Atendimento Prático</h1>
            <p className="text-cvc-dark-blue text-[14px]">Demonstre suas habilidades de 
            atendimento ao cliente</p>
          </div>

          <div className="bg-white border border-cvc-blue/20 rounded-lg p-8">
            <div className="bg-cvc-yellow/10 border-l-4 border-cvc-blue p-6 rounded-lg mb-6">
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
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-cvc-blue mb-2">Primeira Fase Concluída!</h1>
            <p className="text-cvc-dark-blue text-lg mb-4">Você acertou {correctAnswers} de {questions.length} questões ({score}%)</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-green-700 font-semibold">✓ Aprovado para a segunda fase</p>
              <p className="text-green-600 text-sm mt-1">Preparando teste prático...</p>
            </div>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-blue/10 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-cvc-blue" />
          </div>
          <h1 className="font-bold text-cvc-blue mb-3 text-[26px]">Teste de Conhecimentos CVC</h1>
          <p className="text-lg text-cvc-dark-blue font-medium">Conhecimentos Gerais de Turismo</p>
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
              className="bg-cvc-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-cvc-dark-blue disabled:opacity-50 flex items-center gap-3 shadow-md transform hover:scale-105 transition-all duration-200 mx-auto"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Teste'}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}