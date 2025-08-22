import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PlansSection } from "@/components/PlansSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Global trigger in header */}
          <header className="h-16 flex items-center border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <div className="flex-1 flex justify-center">
              <h1 className="text-xl font-semibold text-foreground">WeCareWell Health Watch</h1>
            </div>
            <div className="flex items-center gap-4 mr-4">
              <ThemeToggle />
              <a
                href="/auth"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Log In
              </a>
            </div>
          </header>

          {/* Page content */}
          <div className="overflow-auto">
            <HeroSection />
            <div id="features">
              <FeaturesSection />
            </div>
            <div id="plans">
              <PlansSection />
            </div>
            <div id="why-us">
              <WhyUsSection />
            </div>
            <div id="faqs">
              <FAQSection />
            </div>
            <ContactSection />
            <CTASection />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
