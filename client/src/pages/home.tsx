import { useState, useEffect } from "react";
import Header from "@/components/header";
import Breadcrumb from "@/components/breadcrumb";
import HeroSection from "@/components/hero-section";
import IncomeHighlight from "@/components/income-highlight";
import CommissionDashboard from "@/components/commission-simulator";
import AgentRole from "@/components/agent-role";
import BenefitsSection from "@/components/benefits-section";
import StateRanking from "@/components/state-ranking";
import AboutCVC from "@/components/about-cvc";
import Footer from "@/components/footer";
import CepModal from "@/components/cep-modal";

export default function Home() {
  const [isCepModalOpen, setIsCepModalOpen] = useState(false);

  useEffect(() => {
    // Open CEP modal automatically after 2 seconds
    const timer = setTimeout(() => {
      setIsCepModalOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      <HeroSection />
      <IncomeHighlight />
      <CommissionDashboard />
      <AgentRole />
      <BenefitsSection />
      <StateRanking />
      <AboutCVC />
      <Footer />
      
      <CepModal 
        isOpen={isCepModalOpen}
        onClose={() => setIsCepModalOpen(false)}
      />
    </div>
  );
}
