import { Card } from "@/components/ui/card"
import seniorHealthWatch from "@/assets/senior-health-watch.jpg"

export function ProductShowcase() {
  return (
    <Card className="p-6 bg-healthcare-light/50">
      <div className="text-center mb-4">
        <img 
          src={seniorHealthWatch} 
          alt="Senior wearing SeniorCare health watch" 
          className="w-32 h-24 object-cover rounded-lg mx-auto mb-4"
        />
        <div className="space-y-2">
          <h3 className="font-semibold text-healthcare-gray">SeniorCare Health Watch</h3>
          <p className="text-sm text-muted-foreground">Starting at $199</p>
        </div>
      </div>
    </Card>
  )
}