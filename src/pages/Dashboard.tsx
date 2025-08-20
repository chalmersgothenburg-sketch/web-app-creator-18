import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MarketingDashboard } from "@/components/dashboards/MarketingDashboard";
import { FinanceDashboard } from "@/components/dashboards/FinanceDashboard";
import { CustomerSupportDashboard } from "@/components/dashboards/CustomerSupportDashboard";
import { CustomerDashboard } from "@/components/dashboards/CustomerDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
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
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {userRole === 'customer' && <DashboardSidebar onSignOut={handleSignOut} />}
        <main className={`flex-1 p-6 ${userRole !== 'customer' ? 'ml-0' : ''}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {userRole !== 'customer' && (
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Welcome back, {user.email}
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
            
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
};