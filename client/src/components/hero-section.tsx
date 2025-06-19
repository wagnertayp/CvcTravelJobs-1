import { useState } from "react";
import { Button } from "@/components/ui/button";
import CepModal from "@/components/cep-modal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToAbout = () => {
    const aboutElement = document.getElementById('about-cvc');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-cvc-blue text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-cvc-yellow text-cvc-blue px-3 py-1 rounded-md text-sm font-medium mb-4">
              100% Home Office
            </div>
            <h1 className="text-3xl lg:text-4xl font-inter leading-tight mb-4 font-bold">Torne-se um Agente de Viagens da CVC</h1>
            <p className="text-blue-100 mb-6 text-[16px]">
              Monetize sua paixão por viagens com a maior empresa de turismo do Brasil. 
              Ganhe até R$ 7.500/mês trabalhando de casa, com flexibilidade total e suporte especializado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-cvc-yellow text-cvc-blue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Quero Ser Agente CVC
              </Button>
              <Button
                onClick={() => {
                  const benefitsElement = document.querySelector('[class*="benefits"]')?.closest('section');
                  if (benefitsElement) {
                    benefitsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 border border-white px-6 py-4 rounded-lg font-medium hover:bg-white hover:text-cvc-blue transition-colors bg-cvc-yellow text-cvc-blue"
              >
                Ver Benefícios
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://i.postimg.cc/0NYRRfP6/DM-20250615130153-001.jpg" 
              alt="Profissional trabalhando em casa" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="text-cvc-blue font-bold text-lg">10% a 15%</div>
              <div className="text-gray-600 text-xs">por pacote vendido</div>
            </div>
          </div>
        </div>
      </div>
      <CepModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
