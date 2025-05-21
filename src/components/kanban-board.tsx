"use client"

import type React from "react"

import { useState } from "react"
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AlertCircle, CheckCircle2, Clock, MoveHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type OrderStatus = "pending" | "processing" | "completed"

interface Order {
  id: string
  title: string
  customer: string
  status: OrderStatus
  batchCode: string
  priority: "low" | "medium" | "high"
}
const initialOrders: Order[] = [
  {
    id: "order-1",
    title: "Red Globe - 10 Pallets",
    customer: "FreshMart EU",
    status: "pending",
    batchCode: "RG-2023-05-12-001",
    priority: "high",
  },
  {
    id: "order-2",
    title: "Crimson - 5 Pallets",
    customer: "GlobeExport",
    status: "pending",
    batchCode: "CR-2023-05-12-002",
    priority: "medium",
  },
  {
    id: "order-3",
    title: "Thompson - 8 Pallets",
    customer: "EuroFresh",
    status: "processing",
    batchCode: "TH-2023-05-11-003",
    priority: "high",
  },
  {
    id: "order-4",
    title: "Flame - 3 Pallets",
    customer: "AsiaFruit",
    status: "processing",
    batchCode: "FL-2023-05-10-004",
    priority: "low",
  },
  {
    id: "order-5",
    title: "Red Globe - 6 Pallets",
    customer: "AmeriTrade",
    status: "completed",
    batchCode: "RG-2023-05-09-005",
    priority: "medium",
  },
]

interface SortableOrderProps {
  order: Order
}

function SortableOrder({ order }: SortableOrderProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: order.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-3 cursor-grab active:cursor-grabbing">
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{order.title}</span>
            <Badge
              variant={
                order.priority === "high" ? "destructive" : order.priority === "medium" ? "default" : "secondary"
              }
              className="text-xs"
            >
              {order.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <p className="text-xs text-muted-foreground">{order.customer}</p>
          <p className="mt-1 text-xs font-mono">{order.batchCode}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 text-xs text-muted-foreground">
          <MoveHorizontal className="mr-1 h-3 w-3" />
          Drag to change status
        </CardFooter>
      </Card>
    </div>
  )
}

interface KanbanColumnProps {
  title: string
  orders: Order[]
  icon: React.ReactNode
  count: number
}

function KanbanColumn({ title, orders, icon, count }: KanbanColumnProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-muted/50 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <Badge variant="outline" className="ml-2">
          {count}
        </Badge>
      </div>
      <div className="flex-1">
        {orders.map((order) => (
          <SortableOrder key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export function KanbanBoard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const processingOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeOrder = orders.find((order) => order.id === active.id)
    const overOrder = orders.find((order) => order.id === over.id)

    if (!activeOrder || !overOrder) return

    // If dragging to a different column, update status
    if (activeOrder.status !== overOrder.status) {
      const updatedOrders = orders.map((order) => {
        if (order.id === activeOrder.id) {
          return { ...order, status: overOrder.status }
        }
        return order
      })
      setOrders(updatedOrders)
      return
    }

    // If in the same column, reorder
    const oldIndex = orders.findIndex((order) => order.id === active.id)
    const newIndex = orders.findIndex((order) => order.id === over.id)
    setOrders(arrayMove(orders, oldIndex, newIndex))
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SortableContext items={orders.map((order) => order.id)} strategy={horizontalListSortingStrategy}>
          <KanbanColumn
            title="Pending"
            orders={pendingOrders}
            icon={<Clock className="h-4 w-4 text-amber-500" />}
            count={pendingOrders.length}
          />
          <KanbanColumn
            title="In Process"
            orders={processingOrders}
            icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
            count={processingOrders.length}
          />
          <KanbanColumn
            title="Completed"
            orders={completedOrders}
            icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
            count={completedOrders.length}
          />
        </SortableContext>
      </div>
    </DndContext>
  )
}
