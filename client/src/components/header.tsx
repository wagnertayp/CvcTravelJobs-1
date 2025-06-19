import { AlignJustify } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-cvc-yellow py-3 px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="w-12"></div>
        
        <div className="flex items-center justify-center flex-1">
          <img 
            src="https://i.postimg.cc/jSfHy2yL/d2edd98a-82c3-4ca6-a4fc-328fe352a2a0-removalai-preview.png" 
            alt="CVC Logo" 
            className="h-14 w-auto mr-3"
          />
          <div className="hidden md:block">
            <h1 className="text-cvc-blue font-semibold text-lg">Seja Agente de Viagens</h1>
            <p className="text-cvc-blue text-xs">100% Home Office</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <AlignJustify className="h-6 w-6 text-cvc-blue" strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
}
