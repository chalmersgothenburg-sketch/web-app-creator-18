import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function EmergencyAlert() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-emergency text-emergency-foreground p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Emergency Alert Sent</p>
            <p className="text-xs opacity-90 mt-1">Family notified • Help on the way</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-emergency-foreground hover:bg-emergency-foreground/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}