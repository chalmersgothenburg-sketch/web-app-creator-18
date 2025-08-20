import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Activity, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Settings,
  LogOut,
  Upload
} from "lucide-react";
import { PrescriptionUpload } from "@/components/PrescriptionUpload";
import { InsuranceUpload } from "@/components/InsuranceUpload";

interface DashboardSidebarProps {
  onSignOut: () => void;
}

export const DashboardSidebar = ({ onSignOut }: DashboardSidebarProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-80 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Health Monitor</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 p-6 space-y-4">
        {activeTab === "prescriptions" && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload Prescription
            </h3>
            <PrescriptionUpload />
          </Card>
        )}

        {activeTab === "insurance" && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload Insurance Details
            </h3>
            <InsuranceUpload />
          </Card>
        )}

        {activeTab === "emergency" && (
          <Card className="p-4 border-destructive">
            <h3 className="font-semibold mb-4 text-destructive flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Actions
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Contact Hospital</p>
              <p>• Call Ambulance</p>
              <p>• Notify Insurance</p>
              <p>• Alert Emergency Contacts</p>
            </div>
          </Card>
        )}
      </div>

      <div className="p-6 border-t border-border space-y-4">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};