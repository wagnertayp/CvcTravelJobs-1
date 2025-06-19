import { Heart, Users, Globe, Star, TrendingUp, Building2, Sparkles } from "lucide-react";

export default function AgentRole() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que faz um Agente de Viagens CVC?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Muito mais que vender pacotes, você será um consultor especializado em realizar sonhos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Você terá a oportunidade de <strong>ajudar as pessoas a planejar suas viagens</strong>, oferecendo 
              pacotes exclusivos, compartilhando dicas valiosas e criando itinerários personalizados. Além disso, 
              como agente de viagens, você terá acesso a uma vasta rede de parceiros e fornecedores, 
              permitindo que ofereça aos seus clientes experiências únicas e memoráveis.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              A carreira de agente de viagens também oferece a <strong>oportunidade de explorar o mundo</strong> e 
              conhecer diferentes culturas, além da satisfação de ver seus clientes retornando com sorrisos no rosto.
            </p>
            
            {/* Growth announcement banner */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full px-4 py-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Novas vagas abertas devido ao crescimento da CVC</span>
                <Sparkles className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://i.postimg.cc/zGZbpqr6/TRIMESTRE.png" 
              alt="Agente de viagens ajudando cliente" 
              className="rounded-lg shadow-sm w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cvc-yellow rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-cvc-blue" />
            </div>
            <h3 className="font-semibold text-cvc-blue mb-2">Realizar Sonhos</h3>
            <p className="text-sm text-gray-600">
              Transforme desejos em experiências reais, criando memórias inesquecíveis para seus clientes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cvc-yellow rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-cvc-blue" />
            </div>
            <h3 className="font-semibold text-cvc-blue mb-2">Consultoria Personalizada</h3>
            <p className="text-sm text-gray-600">
              Ofereça orientação especializada baseada no perfil e preferências de cada cliente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cvc-yellow rounded-xl flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-cvc-blue" />
            </div>
            <h3 className="font-semibold text-cvc-blue mb-2">Explorar o Mundo</h3>
            <p className="text-sm text-gray-600">
              Conheça destinos, culturas e amplie seus horizontes enquanto trabalha.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-cvc-yellow rounded-xl flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-cvc-blue" />
            </div>
            <h3 className="font-semibold text-cvc-blue mb-2">Experiências Únicas</h3>
            <p className="text-sm text-gray-600">
              Acesse uma rede exclusiva de parceiros para criar pacotes únicos e memoráveis.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 shadow-lg p-8 mt-10">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Suas Principais Atividades</h3>
            <p className="text-gray-600 text-lg">O dia a dia de um agente de viagens CVC</p>
            <div className="w-24 h-1 bg-gradient-to-r from-cvc-blue to-cvc-yellow rounded-full mx-auto mt-3"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Atendimento ao Cliente</h4>
              </div>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Orientação sobre destinos e atrações</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Criação de roteiros personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Suporte completo pré e pós-viagem</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Vendas e Negociação</h4>
              </div>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apresentação de pacotes exclusivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Negociação de condições e preços</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fechamento e gestão de contratos</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cvc-yellow rounded-lg flex items-center justify-center">
                  <Globe className="h-4 w-4 text-cvc-blue" />
                </div>
                <h4 className="font-semibold text-cvc-blue">Gestão e Planejamento</h4>
              </div>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Acompanhamento de reservas ativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestão de documentação e vistos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Relacionamento com fornecedores</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}