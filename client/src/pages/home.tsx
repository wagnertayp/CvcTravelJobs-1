import Header from "@/components/header";
import OfficialWarning from "@/components/official-warning";
import Breadcrumb from "@/components/breadcrumb";
import HeroSection from "@/components/hero-section";
import IncomeHighlight from "@/components/income-highlight";
import CommissionDashboard from "@/components/commission-simulator";
import AgentRole from "@/components/agent-role";
import BenefitsSection from "@/components/benefits-section";
import StateRanking from "@/components/state-ranking";
import AboutCVC from "@/components/about-cvc";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <OfficialWarning />
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
    </div>
  );
}
