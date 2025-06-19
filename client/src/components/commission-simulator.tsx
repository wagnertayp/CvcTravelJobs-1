import { TrendingUp, Clock, CheckCircle, Radio } from "lucide-react";
import { useState, useEffect } from "react";

export default function CommissionDashboard() {
  const [currentSales, setCurrentSales] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const allSales = [
    {
      agent: "Marina Silva",
      location: "SP",
      package: "Orlando Disney 7 dias",
      value: "R$ 8.457,33",
      commission: "R$ 1.268,60",
      time: "agora",
      status: "confirmed"
    },
    {
      agent: "Carlos Roberto",
      location: "RJ", 
      package: "Cancún All Inclusive 5 dias",
      value: "R$ 5.247,89",
      commission: "R$ 787,18",
      time: "1 min atrás",
      status: "confirmed"
    },
    {
      agent: "Ana Paula",
      location: "MG",
      package: "Cruzeiro MSC Seaside",
      value: "R$ 3.812,44",
      commission: "R$ 456,73",
      time: "2 min atrás",
      status: "confirmed"
    },
    {
      agent: "Ricardo Santos",
      location: "PR",
      package: "Foz do Iguaçu 4 dias",
      value: "R$ 2.134,77",
      commission: "R$ 320,22",
      time: "3 min atrás",
      status: "confirmed"
    },
    {
      agent: "Fernanda Costa",
      location: "SC",
      package: "Gramado Romance 3 dias",
      value: "R$ 1.896,85",
      commission: "R$ 284,53",
      time: "1 min atrás",
      status: "confirmed"
    },
    {
      agent: "João Marcos",
      location: "BA",
      package: "Porto Seguro Resort 5 dias",
      value: "R$ 3.663,91",
      commission: "R$ 549,59",
      time: "2 min atrás",
      status: "confirmed"
    },
    {
      agent: "Patrícia Lima",
      location: "RS",
      package: "Buenos Aires City Tour 4 dias",
      value: "R$ 2.897,22",
      commission: "R$ 434,58",
      time: "agora",
      status: "confirmed"
    },
    {
      agent: "Roberto Alves",
      location: "CE",
      package: "Fortaleza Beach Resort 6 dias",
      value: "R$ 4.218,55",
      commission: "R$ 632,78",
      time: "1 min atrás",
      status: "confirmed"
    },
    {
      agent: "Camila Santos",
      location: "PE",
      package: "Porto de Galinhas Luxo 5 dias",
      value: "R$ 3.468,12",
      commission: "R$ 520,22",
      time: "3 min atrás",
      status: "confirmed"
    },
    {
      agent: "Eduardo Ferreira",
      location: "GO",
      package: "Caldas Novas Relax 3 dias",
      value: "R$ 1.673,49",
      commission: "R$ 251,02",
      time: "2 min atrás",
      status: "confirmed"
    },
    {
      agent: "Juliana Moreira",
      location: "ES",
      package: "Vitória City Break 2 dias",
      value: "R$ 897,65",
      commission: "R$ 134,65",
      time: "1 min atrás",
      status: "confirmed"
    },
    {
      agent: "Alexandre Costa",
      location: "MT",
      package: "Pantanal Adventure 4 dias",
      value: "R$ 2.768,43",
      commission: "R$ 415,26",
      time: "agora",
      status: "confirmed"
    },
    {
      agent: "Luciana Oliveira",
      location: "DF",
      package: "Brasília Cultural 2 dias",
      value: "R$ 1.217,90",
      commission: "R$ 182,69",
      time: "3 min atrás",
      status: "confirmed"
    },
    {
      agent: "Felipe Barbosa",
      location: "AM",
      package: "Manaus Amazônia 5 dias",
      value: "R$ 3.934,78",
      commission: "R$ 590,22",
      time: "2 min atrás",
      status: "confirmed"
    },
    {
      agent: "Renata Silva",
      location: "PB",
      package: "João Pessoa Praias 4 dias",
      value: "R$ 2.323,67",
      commission: "R$ 348,55",
      time: "1 min atrás",
      status: "confirmed"
    }
  ];

  useEffect(() => {
    // Show first 4 sales immediately
    setCurrentSales(allSales.slice(0, 4));
    
    const interval = setInterval(() => {
      setCurrentSales(prev => {
        // Get a random subset of 4-6 sales from the full list
        const numToShow = Math.floor(Math.random() * 3) + 4; // 4-6 items
        const shuffled = [...allSales].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, numToShow);
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const todayStats = {
    totalSales: "R$ 23.890",
    totalCommissions: "R$ 3.584",
    packages: 8,
    topAgent: "Marina Silva"
  };

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vendas dos Agentes CVC</h2>
          <p className="text-gray-600">Acompanhe as vendas em tempo real</p>
        </div>

        {/* Sales Dashboard */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Vendas Recentes</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Radio className="h-4 w-4 text-red-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-medium text-gray-700 bg-red-50 px-2 py-1 rounded-full">
                AO VIVO
              </span>
            </div>
          </div>
          
          <div className="divide-y min-h-[400px]">
            {currentSales.map((sale, index) => (
              <div 
                key={`${sale.agent}-${sale.package}-${index}`}
                className="px-6 py-4 hover:bg-gray-50 transition-all duration-1000 animate-in fade-in slide-in-from-right-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cvc-blue rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{sale.location}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {sale.agent}
                      </div>
                      <div className="text-sm text-gray-600">{sale.package}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{sale.value}</div>
                    <div className="text-sm text-cvc-blue font-semibold">+{sale.commission}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="h-3 w-3" />
                      {sale.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            *Dashboard atualizado em tempo real com vendas de agentes credenciados
          </p>
        </div>
      </div>
    </section>
  );
}