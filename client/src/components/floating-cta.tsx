import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function FloatingCTA() {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={scrollToForm}
        className="bg-cvc-yellow text-cvc-blue px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:bg-yellow-400"
      >
        <Send className="h-4 w-4 mr-2" />
        Candidatar-se
      </Button>
    </div>
  );
}
