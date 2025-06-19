import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertApplication } from "@shared/schema";

export default function ApplicationForm() {
  const [formData, setFormData] = useState<InsertApplication>({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    experience: "",
    motivation: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();

  const submitApplication = useMutation({
    mutationFn: async (data: InsertApplication) => {
      const response = await apiRequest("POST", "/api/applications", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Candidatura enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        state: "",
        experience: "",
        motivation: "",
      });
      setAcceptedTerms(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar candidatura",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e telefone.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Termos e condições",
        description: "Aceite os termos para continuar.",
        variant: "destructive",
      });
      return;
    }

    submitApplication.mutate(formData);
  };

  return (
    <section id="application-form" className="py-16 px-6 bg-gradient-to-br from-cvc-blue to-cvc-dark-blue">
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl text-blue-100">Preencha o formulário e dê o primeiro passo rumo à sua independência financeira</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 text-sm font-semibold mb-2">Nome Completo *</Label>
                <Input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm font-semibold mb-2">E-mail *</Label>
                <Input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 text-sm font-semibold mb-2">Telefone *</Label>
                <Input
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm font-semibold mb-2">Estado</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent">
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-gray-700 text-sm font-semibold mb-2">Experiência em Vendas</Label>
              <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                <SelectTrigger className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent">
                  <SelectValue placeholder="Selecione sua experiência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma experiência</SelectItem>
                  <SelectItem value="basic">1-2 anos</SelectItem>
                  <SelectItem value="intermediate">3-5 anos</SelectItem>
                  <SelectItem value="advanced">Mais de 5 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-700 text-sm font-semibold mb-2">Por que quer ser agente CVC?</Label>
              <Textarea
                rows={4}
                placeholder="Conte-nos sua motivação..."
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="focus:ring-2 focus:ring-cvc-blue focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
                className="focus:ring-cvc-blue"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700">
                Aceito os termos e condições e autorizo o contato *
              </Label>
            </div>
            <Button
              type="submit"
              disabled={submitApplication.isPending}
              className="w-full bg-cvc-blue text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-cvc-dark-blue shadow-lg"
            >
              {submitApplication.isPending ? "Enviando..." : "Enviar Candidatura"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
