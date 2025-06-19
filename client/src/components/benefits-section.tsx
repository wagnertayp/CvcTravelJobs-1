import { DollarSign, Plane, Clock, GraduationCap, Smartphone, Award } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Renda Consistente",
      description: "Ganhe de R$ 4.500 a R$ 7.500 mensais com comissões por pacote vendido. Sem teto máximo de ganhos."
    },
    {
      icon: Plane,
      title: "Desconto em Viagens",
      description: "Descontos exclusivos de até 50% em hotéis, passagens e pacotes para você e sua família."
    },
    {
      icon: Clock,
      title: "Flexibilidade Total",
      description: "Defina seus próprios horários. Trabalhe de manhã, tarde ou noite - você escolhe quando atender."
    },
    {
      icon: GraduationCap,
      title: "Capacitação Profissional",
      description: "Treinamento completo e certificado pela CVC. Do básico ao avançado, tudo 100% online."
    },
    {
      icon: Smartphone,
      title: "Sistema Completo",
      description: "Plataforma digital com todo o catálogo CVC: hotéis, cruzeiros, pacotes nacionais e internacionais."
    },
    {
      icon: Award,
      title: "Certificação Oficial",
      description: "Torne-se um Agente de Viagens Autorizado CVC com credencial reconhecida no mercado."
    }
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Por que escolher a CVC?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mais que um trabalho, uma oportunidade de crescer com a maior empresa de turismo do Brasil
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-cvc-blue hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cvc-yellow rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="text-cvc-blue h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
