import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { MarketingDashboard } from "@/components/dashboards/MarketingDashboard";
import { FinanceDashboard } from "@/components/dashboards/FinanceDashboard";
import { CustomerSupportDashboard } from "@/components/dashboards/CustomerSupportDashboard";
import { CustomerDashboard } from "@/components/dashboards/CustomerDashboard";
import { EmergencyDashboard } from "@/components/dashboards/EmergencyDashboard";
import { PrescriptionDashboard } from "@/components/dashboards/PrescriptionDashboard";
import { InsuranceDashboard } from "@/components/dashboards/InsuranceDashboard";
import { SettingsDashboard } from "@/components/dashboards/SettingsDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Shield, 
  MessageCircle, 
  Phone, 
  AlertTriangle, 
  FileText, 
  Settings,
  LogOut
} from "lucide-react";
import { toast } from "sonner";

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Determine user role based on email domain
  const getUserRole = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain?.includes('marketing') || domain?.includes('mktg')) {
      return 'marketing';
    } else if (domain?.includes('finance') || domain?.includes('accounting') || domain?.includes('fin')) {
      return 'finance';
    } else if (domain?.includes('support') || domain?.includes('cs') || domain?.includes('help')) {
      return 'support';
    } else {
      return 'customer'; // Default for regular customers
    }
  };

  const userRole = user?.email ? getUserRole(user.email) : 'customer';

  // Navigation items for main pages
  const mainNavItems = [
    { id: "home", label: "Home", icon: Heart, action: () => navigate("/") },
    { id: "features", label: "Features", icon: Activity, action: () => navigate("/") },
    { id: "plans", label: "Plans", icon: Shield, action: () => navigate("/") },
    { id: "why-us", label: "Why Us", icon: MessageCircle, action: () => navigate("/") },
    { id: "faqs", label: "FAQs", icon: Phone, action: () => navigate("/") },
  ];

  // Dashboard navigation items (only for customers)
  const dashboardNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];


  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'marketing':
        return <MarketingDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'support':
        return <CustomerSupportDashboard />;
      case 'customer':
      default:
        return renderCustomerDashboard();
    }
  };

  const renderCustomerDashboard = () => {
    switch (activeTab) {
      case "dashboard":
        return <CustomerDashboard />;
      case "emergency":
        return <EmergencyDashboard />;
      case "prescriptions":
        return <PrescriptionDashboard />;
      case "insurance":
        return <InsuranceDashboard />;
      case "settings":
        return <SettingsDashboard />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Enhanced Header with Glass Effect */}
      <header className="h-24 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-white/95 via-white/90 to-white/85 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/85 backdrop-blur-xl sticky top-0 z-50 px-8 shadow-lg shadow-primary/5">
        <div className="flex items-center flex-1">
          <div className="flex items-center mr-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 shadow-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              WeCareWell
            </h1>
          </div>
          
          {userRole === 'customer' ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 max-w-5xl">
              <TabsList className="grid grid-cols-5 w-full h-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-3 gap-3 border border-white/20 shadow-2xl backdrop-blur-sm">
                {dashboardNavItems.map((item) => (
                  <TabsTrigger 
                    key={item.id} 
                    value={item.id} 
                    className="relative text-sm font-semibold px-8 py-4 rounded-2xl transition-all duration-500 ease-out
                               data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary 
                               data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30
                               data-[state=active]:scale-105 data-[state=active]:transform
                               hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 hover:scale-102
                               hover:shadow-lg hover:shadow-primary/10
                               flex items-center gap-3 group"
                  >
                    <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-data-[state=active]:drop-shadow-sm" />
                    <span className="hidden sm:inline transition-all duration-300">{item.label}</span>
                    <span className="sm:hidden transition-all duration-300">{item.label.slice(0, 3)}</span>
                    {/* Active indicator */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300 -z-10" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          ) : (
            <div className="flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 group"
                >
                  <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              Welcome, {user.email?.split('@')[0]}
            </span>
          </div>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200 dark:border-red-800 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/70 dark:hover:to-red-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50"
          >
            <LogOut className="h-4 w-4" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content with Enhanced Spacing */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            {renderDashboard()}
          </div>
        </div>
      </main>
    </div>
  );
};