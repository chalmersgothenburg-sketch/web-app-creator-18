import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
}

export function FeatureCard({ icon: Icon, title, description, iconColor = "text-primary" }: FeatureCardProps) {
  return (
    <Card className="p-6 text-center hover:shadow-md transition-shadow">
      <div className="mb-4 flex justify-center">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}