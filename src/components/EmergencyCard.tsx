import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function EmergencyCard() {
  return (
    <Card className="bg-emergency/5 border-emergency/20 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emergency/10 rounded-full">
          <Phone className="h-4 w-4 text-emergency" />
        </div>
        <div>
          <h3 className="font-semibold text-emergency text-sm">Emergency</h3>
          <p className="text-xs text-emergency/80">24/7 immediate response</p>
        </div>
      </div>
      
      <Button 
        className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground"
        size="sm"
      >
        Call Now
      </Button>
    </Card>
  )
}