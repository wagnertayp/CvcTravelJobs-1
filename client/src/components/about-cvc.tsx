import { useState } from "react";
import CepModal from "./cep-modal";

export default function AboutCVC() {
  const [isCepModalOpen, setIsCepModalOpen] = useState(false);
  return (
    <section id="about-cvc" className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que a CVC?</h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Junte-se à maior operadora de turismo da América Latina. Com mais de 4 décadas no mercado, 
              oferecemos a estrutura, credibilidade e suporte que você precisa para construir uma carreira 
              sólida no setor de viagens.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cvc-blue rounded-full"></div>
                <span className="text-gray-700 text-sm">Líder absoluta no mercado brasileiro de turismo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cvc-blue rounded-full"></div>
                <span className="text-gray-700 text-sm">Mais de 5 milhões de clientes satisfeitos anualmente</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cvc-blue rounded-full"></div>
                <span className="text-gray-700 text-sm">Presença nacional com mais de 1.000 pontos de venda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cvc-blue rounded-full"></div>
                <span className="text-gray-700 text-sm">Suporte técnico e comercial especializado 24/7</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-cvc-blue">40+</div>
                  <div className="text-gray-600 text-xs">Anos de experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-cvc-blue">1000+</div>
                  <div className="text-gray-600 text-xs">Pontos de venda</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://admin.panrotas.com.br/media/thumb/cropper/permalink/fix/1200,675/?source=media-files-original/2024/04/05/eda16f194d5abc95ef2ea666075e3eba-clubeamigoagente.jpg" 
              alt="Escritório moderno representando a CVC" 
              className="rounded-lg shadow-sm w-full h-auto"
            />
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsCepModalOpen(true)}
                className="bg-cvc-blue hover:bg-cvc-dark-blue text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Quero ser Agente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CEP Modal */}
      <CepModal 
        isOpen={isCepModalOpen} 
        onClose={() => setIsCepModalOpen(false)} 
      />
    </section>
  );
}
