import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, Users, TrendingUp, Star, Phone, Clock, Award } from "lucide-react";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgenciasProximas() {
  const [, setLocation] = useLocation();
  
  // Get user data from localStorage
  const validatedCPFData = JSON.parse(localStorage.getItem('validatedCPFData') || '{}');
  const userFirstName = validatedCPFData.nome ? validatedCPFData.nome.split(' ')[0] : 'Candidato';
  const userFullName = validatedCPFData.nome || 'Candidato';
  
  const cepData = JSON.parse(localStorage.getItem('cepData') || '{}');
  const userCity = cepData.cidade || 'Brasília';
  const userState = cepData.estado || 'DF';

  const agencies = [
    {
      id: 1,
      name: "CVC Shopping Brasília",
      address: "SCS Q. 6, Bl. A - Asa Sul, Brasília - DF",
      distance: "2.3 km",
      phone: "(61) 3214-8900",
      hours: "9h às 22h",
      rating: 4.8,
      manager: "Ana Paula Santos",
      team: [
        { name: "Carlos Eduardo", role: "Supervisor de Vendas", commission: "R$ 8.200" },
        { name: "Mariana Costa", role: "Consultora Sênior", commission: "R$ 6.800" },
        { name: "Pedro Lima", role: "Consultor", commission: "R$ 5.400" },
        { name: userFullName, role: "Agente de Viagens (Home Office)", commission: "R$ 4.200 - R$ 7.500" }
      ],
      totalSales: "R$ 850.000",
      monthlyGoal: "R$ 1.200.000"
    },
    {
      id: 2,
      name: "CVC Taguatinga Shopping",
      address: "QS 1, Rua 210 - Águas Claras, Brasília - DF",
      distance: "8.7 km",
      phone: "(61) 3435-7200",
      hours: "10h às 22h",
      rating: 4.6,
      manager: "Roberto Silva",
      team: [
        { name: "Juliana Ferreira", role: "Supervisora de Vendas", commission: "R$ 7.900" },
        { name: "André Oliveira", role: "Consultor Sênior", commission: "R$ 6.200" },
        { name: "Camila Rocha", role: "Consultora", commission: "R$ 5.100" },
        { name: userFullName, role: "Agente de Viagens (Home Office)", commission: "R$ 3.800 - R$ 6.900" }
      ],
      totalSales: "R$ 720.000",
      monthlyGoal: "R$ 950.000"
    },
    {
      id: 3,
      name: "CVC Planaltina",
      address: "Av. Uberdan Cardoso, 120 - Planaltina, DF",
      distance: "15.2 km",
      phone: "(61) 3389-4500",
      hours: "8h às 18h",
      rating: 4.4,
      manager: "Fernanda Alves",
      team: [
        { name: "Lucas Martins", role: "Supervisor de Vendas", commission: "R$ 7.400" },
        { name: "Priscila Sousa", role: "Consultora Sênior", commission: "R$ 5.800" },
        { name: "Rafael Santos", role: "Consultor", commission: "R$ 4.700" },
        { name: userFullName, role: "Agente de Viagens (Home Office)", commission: "R$ 3.500 - R$ 6.200" }
      ],
      totalSales: "R$ 580.000",
      monthlyGoal: "R$ 750.000"
    }
  ];

  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-6 py-16 pt-[13px] pb-[13px]">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cvc-blue/10 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-cvc-blue" />
          </div>
          <h1 className="font-bold text-cvc-blue mb-3 text-[26px]">Agências CVC Próximas</h1>
          <p className="text-lg text-cvc-dark-blue font-medium">
            Encontre sua equipe de trabalho em {userCity}/{userState}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de Agências */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-cvc-blue mb-4">Agências Disponíveis</h2>
            
            {agencies.map((agency) => (
              <Card 
                key={agency.id} 
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  selectedAgency === agency.id 
                    ? 'border-cvc-blue bg-cvc-yellow/5' 
                    : 'border-gray-200 hover:border-cvc-blue/50'
                }`}
                onClick={() => setSelectedAgency(agency.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-cvc-blue text-lg">{agency.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{agency.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{agency.rating}</span>
                      </div>
                      <span className="text-xs text-cvc-blue font-medium">{agency.distance}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-cvc-blue" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cvc-blue" />
                      <span>{agency.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-cvc-blue/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-cvc-blue">Gerente:</span>
                      <span className="text-sm text-cvc-dark-blue">{agency.manager}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium text-cvc-blue">Vendas do Mês:</span>
                      <span className="text-sm font-bold text-green-600">{agency.totalSales}</span>
                    </div>
                  </div>
                  
                  {selectedAgency === agency.id && (
                    <div className="mt-4 p-4 bg-cvc-yellow/10 rounded-lg border border-cvc-blue/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-cvc-blue" />
                        <span className="font-semibold text-cvc-blue">Agência Selecionada</span>
                      </div>
                      <p className="text-sm text-cvc-dark-blue">
                        Você trabalhará em home office integrado à equipe desta agência.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalhes da Equipe */}
          <div className="lg:sticky lg:top-6">
            {selectedAgency ? (
              <Card className="border-cvc-blue/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cvc-blue/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-cvc-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-cvc-blue">Equipe de Trabalho</CardTitle>
                      <p className="text-sm text-gray-600">
                        {agencies.find(a => a.id === selectedAgency)?.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {agencies.find(a => a.id === selectedAgency)?.team.map((member, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-2 ${
                          member.name === userFullName 
                            ? 'border-cvc-yellow bg-cvc-yellow/10' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-semibold ${
                              member.name === userFullName ? 'text-cvc-blue' : 'text-gray-800'
                            }`}>
                              {member.name}
                              {member.name === userFullName && (
                                <span className="ml-2 text-xs bg-cvc-blue text-white px-2 py-1 rounded">
                                  VOCÊ
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="font-bold text-sm">{member.commission}</span>
                            </div>
                            <span className="text-xs text-gray-500">Comissão/mês</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-cvc-blue/5 rounded-lg">
                    <h4 className="font-semibold text-cvc-blue mb-2">Performance da Equipe</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Meta Mensal:</span>
                        <span className="font-bold text-cvc-blue">
                          {agencies.find(a => a.id === selectedAgency)?.monthlyGoal}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendas Atuais:</span>
                        <span className="font-bold text-green-600">
                          {agencies.find(a => a.id === selectedAgency)?.totalSales}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min(100, 
                              (parseInt(agencies.find(a => a.id === selectedAgency)?.totalSales.replace(/[R$.,\s]/g, '') || '0') / 
                               parseInt(agencies.find(a => a.id === selectedAgency)?.monthlyGoal.replace(/[R$.,\s]/g, '') || '1')) * 100
                            )}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 text-center mt-1">
                        {Math.round(
                          (parseInt(agencies.find(a => a.id === selectedAgency)?.totalSales.replace(/[R$.,\s]/g, '') || '0') / 
                           parseInt(agencies.find(a => a.id === selectedAgency)?.monthlyGoal.replace(/[R$.,\s]/g, '') || '1')) * 100
                        )}% da meta atingida
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setLocation('/conta-bancaria')}
                    className="w-full mt-6 bg-cvc-blue text-white py-3 rounded-lg font-semibold hover:bg-cvc-dark-blue"
                  >
                    Confirmar Agência e Continuar
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-600 mb-2">Selecione uma Agência</h3>
                  <p className="text-sm text-gray-500">
                    Clique em uma agência para ver a equipe de trabalho e estimativas de comissão.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}