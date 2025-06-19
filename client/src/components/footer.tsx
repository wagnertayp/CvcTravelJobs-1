import { Phone, Mail, Globe, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cvc-blue text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src="https://i0.wp.com/cvcagentes.com/wp-content/uploads/2024/09/logo-so-azul-png.png?resize=270%2C300&ssl=1" 
              alt="CVC Logo" 
              className="h-12 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-blue-100 text-sm leading-relaxed">
              A maior operadora de turismo da América Latina. Realizando sonhos há mais de 40 anos.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contato</h4>
            <div className="space-y-3 text-blue-100 text-sm">
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-cvc-yellow" />
                0800-979-2827
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cvc-yellow" />
                agentes@cvc.com.br
              </p>
              <p className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-cvc-yellow" />
                www.cvcagentes.com
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Informações Corporativas</h4>
            <div className="space-y-3 text-blue-100 text-sm">
              <p className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-cvc-yellow mt-0.5 flex-shrink-0" />
                <span>
                  CVC BRASIL OPERADORA E AGÊNCIA DE VIAGENS S.A<br/>
                  CNPJ/MF: 10.760.260/0001-19
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-sm">
              &copy; 2025 CVC Brasil Operadora e Agência de Viagens S.A. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-cvc-yellow transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-blue-100 hover:text-cvc-yellow transition-colors text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
