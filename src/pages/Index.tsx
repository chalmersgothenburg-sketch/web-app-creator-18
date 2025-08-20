import { Heart, Shield, Users, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/FeatureCard"
import { ProductShowcase } from "@/components/ProductShowcase"
import { ComplianceBadges } from "@/components/ComplianceBadges"
import seniorHealthWatch from "@/assets/senior-health-watch.jpg"

const Index = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-healthcare-gray leading-tight">
              Peace of Mind for{" "}
              <span className="text-primary">Your Loved Ones</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Advanced health monitoring with instant emergency response, 
              real-time family notifications, and comprehensive care services.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-healthcare-gray text-healthcare-gray hover:bg-muted">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          <div className="pt-4">
            <ComplianceBadges />
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <img 
            src={seniorHealthWatch} 
            alt="Happy senior wearing SeniorCare health watch" 
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Heart}
          title="24/7 Health Monitoring"
          description="Continuous tracking of vital signs with instant alerts for any irregularities"
        />
        
        <FeatureCard
          icon={Shield}
          title="Instant Emergency"
          description="One-touch emergency response with immediate family and medical notifications"
          iconColor="text-emergency"
        />
        
        <FeatureCard
          icon={Users}
          title="Family Connected"
          description="Real-time updates and peace of mind for families with secure health sharing"
          iconColor="text-success"
        />
      </section>
      
      {/* Product Section */}
      <section className="bg-healthcare-light/30 rounded-2xl p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <ProductShowcase />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-healthcare-gray">
              SeniorCare Health Watch
            </h2>
            <p className="text-muted-foreground">
              Our flagship device combines cutting-edge health monitoring 
              with emergency response capabilities in an elegant, easy-to-use design.
            </p>
            
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                Order Now
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
