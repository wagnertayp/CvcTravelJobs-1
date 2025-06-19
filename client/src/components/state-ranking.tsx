import { Trophy, TrendingUp, Users } from "lucide-react";

export default function StateRanking() {
  const stateData = [
    {
      state: "São Paulo",
      abbreviation: "SP",
      averageEarnings: "R$ 6.850",
      packagesPerMonth: 28,
      agentsCount: 1247,
      rank: 1,
      growth: "+12%"
    },
    {
      state: "Rio de Janeiro", 
      abbreviation: "RJ",
      averageEarnings: "R$ 6.200",
      packagesPerMonth: 25,
      agentsCount: 892,
      rank: 2,
      growth: "+8%"
    },
    {
      state: "Minas Gerais",
      abbreviation: "MG", 
      averageEarnings: "R$ 5.900",
      packagesPerMonth: 24,
      agentsCount: 743,
      rank: 3,
      growth: "+15%"
    },
    {
      state: "Paraná",
      abbreviation: "PR",
      averageEarnings: "R$ 5.650",
      packagesPerMonth: 23,
      agentsCount: 456,
      rank: 4,
      growth: "+6%"
    },
    {
      state: "Santa Catarina",
      abbreviation: "SC",
      averageEarnings: "R$ 5.400",
      packagesPerMonth: 22,
      agentsCount: 389,
      rank: 5,
      growth: "+9%"
    },
    {
      state: "Rio Grande do Sul",
      abbreviation: "RS",
      averageEarnings: "R$ 5.250",
      packagesPerMonth: 21,
      agentsCount: 521,
      rank: 6,
      growth: "+4%"
    }
  ];

  const podiumStates = stateData.slice(0, 3);
  const otherStates = stateData.slice(3);

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Performance dos Agentes de Viagens por Estado</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como estão performando os agentes de viagens CVC credenciados em cada região do Brasil
          </p>
        </div>

        {/* Podium Section */}
        <div className="mb-10">
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* 2º Lugar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center w-52">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-600 font-bold text-lg">2°</span>
              </div>
              <div className="text-cvc-blue font-bold text-sm mb-1">{podiumStates[1].state}</div>
              <div className="text-xl font-bold text-gray-900 mb-1">{podiumStates[1].averageEarnings}</div>
              <div className="text-xs text-gray-500">{podiumStates[1].packagesPerMonth} pacotes/mês</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{podiumStates[1].agentsCount} agentes</span>
              </div>
            </div>

            {/* 1º Lugar */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cvc-yellow text-center w-56 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Trophy className="h-6 w-6 text-cvc-yellow" />
              </div>
              <div className="w-14 h-14 bg-cvc-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-cvc-blue font-bold text-xl">1°</span>
              </div>
              <div className="text-cvc-blue font-bold mb-1">{podiumStates[0].state}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{podiumStates[0].averageEarnings}</div>
              <div className="text-sm text-gray-600">{podiumStates[0].packagesPerMonth} pacotes/mês</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{podiumStates[0].agentsCount} agentes</span>
              </div>
            </div>

            {/* 3º Lugar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center w-52">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-lg">3°</span>
              </div>
              <div className="text-cvc-blue font-bold text-sm mb-1">{podiumStates[2].state}</div>
              <div className="text-xl font-bold text-gray-900 mb-1">{podiumStates[2].averageEarnings}</div>
              <div className="text-xs text-gray-500">{podiumStates[2].packagesPerMonth} pacotes/mês</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{podiumStates[2].agentsCount} agentes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Outras Posições */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-900">Outras Regiões</h3>
          </div>
          <div className="divide-y">
            {otherStates.map((item, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">{item.rank}°</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.state}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-3">
                        <span>{item.agentsCount} agentes ativos</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          {item.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.averageEarnings}</div>
                    <div className="text-sm text-gray-500">{item.packagesPerMonth} pacotes/mês</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            *Dados dos últimos 12 meses de agentes de viagens CVC credenciados | Atualizado mensalmente
          </p>
        </div>
      </div>
    </section>
  );
}