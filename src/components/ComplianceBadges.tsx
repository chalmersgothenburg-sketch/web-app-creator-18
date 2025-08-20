import { Shield, CheckCircle, Clock } from "lucide-react"

export function ComplianceBadges() {
  const badges = [
    { icon: CheckCircle, text: "FDA Approved", color: "text-success" },
    { icon: Shield, text: "HIPAA Compliant", color: "text-primary" },
    { icon: Clock, text: "24/7 Support", color: "text-emergency" }
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`p-1 rounded-full ${badge.color}`}>
            <badge.icon className="h-3 w-3" />
          </div>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  )
}