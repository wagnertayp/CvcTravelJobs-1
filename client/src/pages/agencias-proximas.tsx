import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, Users, TrendingUp, Star, Phone, Clock, Award } from "lucide-react";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgenciasProximas() {
  const [, setLocation] = useLocation();
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  
  // Get user data from localStorage
  const validatedCPFData = JSON.parse(localStorage.getItem('validatedCPFData') || '{}');
  const userFirstName = validatedCPFData.nome ? validatedCPFData.nome.split(' ')[0] : 'Candidato';
  const userDisplayName = validatedCPFData.nome ? 
    validatedCPFData.nome.split(' ').slice(0, 2).join(' ') : 'Candidato';
  
  const cepData = JSON.parse(localStorage.getItem('cepData') || '{}');
  const userCity = cepData.cidade || 'Brasília';
  const userState = cepData.estado || 'DF';

  const agencies = [
    {
      id: 1,
      name: "CVC Shopping Ibirapuera",
      address: "Av. Ibirapuera, 3103 - Moema, São Paulo - SP",
      distance: "2.3 km",
      phone: "(11) 5095-2800",
      hours: "9h às 22h",
      rating: 4.8,
      manager: "Ana Paula Santos",
      team: [
        { name: "Carlos Eduardo", role: "Supervisor de Vendas", commission: "R$ 8.200" },
        { name: "Mariana Costa", role: "Consultora Sênior", commission: "R$ 6.800" },
        { name: "Pedro Lima", role: "Consultor", commission: "R$ 5.400" },
        { name: userDisplayName, role: "Agente de Viagens (Home Office)", commission: "R$ 4.200 - R$ 7.500" }
      ],
      totalSales: "R$ 850.000",
      monthlyGoal: "R$ 1.200.000"
    },
    {
      id: 2,
      name: "CVC Shopping Eldorado",
      address: "Av. Rebouças, 3970 - Pinheiros, São Paulo - SP",
      distance: "8.7 km",
      phone: "(11) 3815-4500",
      hours: "10h às 22h",
      rating: 4.6,
      manager: "Roberto Silva",
      team: [
        { name: "Juliana Ferreira", role: "Supervisora de Vendas", commission: "R$ 7.900" },
        { name: "André Oliveira", role: "Consultor Sênior", commission: "R$ 6.200" },
        { name: "Camila Rocha", role: "Consultora", commission: "R$ 5.100" },
        { name: userDisplayName, role: "Agente de Viagens (Home Office)", commission: "R$ 3.800 - R$ 6.900" }
      ],
      totalSales: "R$ 720.000",
      monthlyGoal: "R$ 950.000"
    },
    {
      id: 3,
      name: "CVC Shopping Morumbi",
      address: "Av. Roque Petroni Jr., 1089 - Morumbi, São Paulo - SP",
      distance: "12.1 km",
      phone: "(11) 4003-4500",
      hours: "10h às 22h",
      rating: 4.7,
      manager: "Fernanda Oliveira",
      team: [
        { name: "Lucas Mendes", role: "Supervisor de Vendas", commission: "R$ 7.600" },
        { name: "Patrícia Alves", role: "Consultora Sênior", commission: "R$ 5.900" },
        { name: "Ricardo Santos", role: "Consultor", commission: "R$ 4.800" },
        { name: userDisplayName, role: "Agente de Viagens (Home Office)", commission: "R$ 3.500 - R$ 6.200" }
      ],
      totalSales: "R$ 580.000",
      monthlyGoal: "R$ 750.000"
    }
  ];

  const selectedAgencyData = agencies.find(a => a.id === selectedAgency);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Home Office Notice */}
        <div className="bg-cvc-blue/5 border border-cvc-blue/20 rounded-lg p-4 mb-8">
          <div>
            <h3 className="font-semibold text-cvc-blue">Trabalho 100% Home Office</h3>
            <p className="text-sm text-cvc-dark-blue">Segunda a sexta, horário flexível - você trabalhará de casa integrado à equipe da agência</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-bold text-cvc-blue mb-2 text-[24px]">Agências CVC em São Paulo</h1>
          <p className="text-cvc-dark-blue text-[14px]">Selecione uma agência para integrar sua equipe em home office</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Agências */}
          <div className="lg:col-span-2 space-y-4">
            {agencies.map((agency) => (
              <Card 
                key={agency.id} 
                className={`cursor-pointer transition-all ${
                  selectedAgency === agency.id 
                    ? 'border-cvc-blue bg-cvc-yellow/5' 
                    : 'border-gray-200 hover:border-cvc-blue/50'
                }`}
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
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-cvc-blue" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cvc-blue" />
                      <span>{agency.hours}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedAgency(agency.id)}
                    className={`w-full ${
                      selectedAgency === agency.id
                        ? 'bg-cvc-yellow text-cvc-blue hover:bg-cvc-yellow/90'
                        : 'bg-cvc-blue text-white hover:bg-cvc-dark-blue'
                    }`}
                  >
                    {selectedAgency === agency.id ? 'Agência Selecionada' : 'Selecionar Agência'}
                  </Button>
                  
                  {selectedAgency === agency.id && (
                    <div className="mt-4 p-4 bg-cvc-yellow/10 rounded-lg border border-cvc-blue/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-cvc-blue" />
                        <span className="font-semibold text-cvc-blue">Agência Selecionada</span>
                      </div>
                      <p className="text-sm text-cvc-dark-blue mb-2">
                        Você trabalhará em home office integrado à equipe desta agência.
                      </p>
                      <p className="text-sm text-cvc-blue font-semibold">
                        Gerente: {agency.manager}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalhes da Equipe */}
          <div className="lg:sticky lg:top-6">
            {selectedAgencyData ? (
              <Card className="border-cvc-blue/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cvc-blue/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-cvc-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-cvc-blue">Equipe de Trabalho</CardTitle>
                      <p className="text-sm text-gray-600">
                        {selectedAgencyData.name}
                      </p>
                      <p className="text-sm font-semibold text-cvc-blue mt-1">
                        Gerente: {selectedAgencyData.manager}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {selectedAgencyData.team.map((member, index) => (
                      <div key={index} className="flex justify-between items-start p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-cvc-blue">{member.commission}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-cvc-blue/5 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-cvc-blue mb-3">Performance da Agência</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Vendas do Mês:</span>
                        <span className="font-medium text-cvc-blue">{selectedAgencyData.totalSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Meta Mensal:</span>
                        <span className="font-medium text-gray-900">{selectedAgencyData.monthlyGoal}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-cvc-blue h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min((parseInt(selectedAgencyData.totalSales.replace(/[^\d]/g, '')) / parseInt(selectedAgencyData.monthlyGoal.replace(/[^\d]/g, ''))) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {Math.round((parseInt(selectedAgencyData.totalSales.replace(/[^\d]/g, '')) / parseInt(selectedAgencyData.monthlyGoal.replace(/[^\d]/g, ''))) * 100)}% da meta alcançada
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setLocation('/conta-bancaria')}
                    className="w-full bg-cvc-blue text-white hover:bg-cvc-dark-blue"
                  >
                    Confirmar Seleção
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Selecione uma Agência</h3>
                    <p className="text-sm text-gray-600">
                      Escolha uma agência para ver os detalhes da equipe e comissões
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}