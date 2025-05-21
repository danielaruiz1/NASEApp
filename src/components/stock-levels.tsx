import { AlertTriangle } from "lucide-react"

import { Progress } from "@/components/ui/progress"

interface StockItem {
  id: string
  name: string
  level: number
  threshold: number
  unit: string
}

const stockItems: StockItem[] = [
  {
    id: "item-1",
    name: "Red Globe Bags",
    level: 15,
    threshold: 20,
    unit: "boxes",
  },
  {
    id: "item-2",
    name: "Crimson Bags",
    level: 8,
    threshold: 20,
    unit: "boxes",
  },
  {
    id: "item-3",
    name: "Thompson Bags",
    level: 25,
    threshold: 20,
    unit: "boxes",
  },
  {
    id: "item-4",
    name: "Pallet Wraps",
    level: 12,
    threshold: 15,
    unit: "rolls",
  },
  {
    id: "item-5",
    name: "Export Labels",
    level: 5,
    threshold: 10,
    unit: "packs",
  },
]

export function StockLevels() {
  return (
    <div className="space-y-4">
      {stockItems.map((item) => {
        const isCritical = item.level < item.threshold
        const percentage = Math.min(Math.round((item.level / item.threshold) * 100), 100)

        return (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.name}</span>
                {isCritical && <AlertTriangle className="h-4 w-4 text-destructive" />}
              </div>
              <span className="text-sm text-muted-foreground">
                {item.level} / {item.threshold} {item.unit}
              </span>
            </div>
            <Progress
              value={percentage}
              className={isCritical ? "bg-destructive/20" : ""}
              //indicatorClassName={isCritical ? "bg-destructive" : ""}
            />
          </div>
        )
      })}
    </div>
  )
}
