"use client"

import type React from "react"

import { useState } from "react"
import { DndContext, type DragEndEvent, closestCenter, useDroppable } from "@dnd-kit/core"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type OrderStatus = "processing" | "completed"

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
    transition: transition || "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-3 cursor-grab active:cursor-grabbing flex flex-row flex-wrap items-center transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="border-0 w-30 flex p-0 ml-4 flex-1 min-w-30 items-center">
          <div className="flex items-center justify-between min-w-0">
            <span className="text-sm font-medium flex-1 min-w-0 whitespace-normal break-words">{order.title}</span>
          </div>
        </CardHeader>
        <CardContent className="border-0 px-0 flex justify-start min-w-10 mr-4 ml-4">
          <p className="border-0 text-xs text-muted-foreground w-20 min-w-20 whitespace-normal break-words">{order.customer}</p>
          <p className="border-0 text-xs font-mono w-40 whitespace-normal break-words">{order.batchCode}</p>
        </CardContent>
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
  const { setNodeRef, isOver } = useDroppable({ id: title })

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
      <div className="flex-1 min-h-[48px]" ref={setNodeRef}>
        <SortableContext items={orders.map((order) => order.id)} strategy={horizontalListSortingStrategy}>
          {orders.length === 0 ? (
            <div
              className={`rounded border border-dashed border-muted-foreground/40 p-4 text-xs text-muted-foreground text-center select-none transition-colors duration-200
                ${isOver ? "bg-blue-100 border-blue-400 text-blue-600" : ""}
              `}
            >
              Arrastra aquí para mover
            </div>
          ) : (
            orders.map((order) => (
              <SortableOrder key={order.id} order={order} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export function KanbanBoard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const processingOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeOrder = orders.find((order) => order.id === active.id)
    const overOrder = orders.find((order) => order.id === over.id)

    if (!activeOrder || !overOrder) {
      // Si se hace drop en una columna vacía, over.id será el título de la columna
      // Detecta a qué columna corresponde y actualiza el status
      if (over && (over.id === "In Process" || over.id === "Completed")) {
        setOrders(
          orders.map((order) =>
            order.id === active.id
              ? { ...order, status: over.id === "In Process" ? "processing" : "completed" }
              : order
          )
        )
      }
      return
    }

    // Si dragging entre columnas, actualiza status
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

    // Si en la misma columna, reordena
    const oldIndex = orders.findIndex((order) => order.id === active.id)
    const newIndex = orders.findIndex((order) => order.id === over.id)
    setOrders(arrayMove(orders, oldIndex, newIndex))
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <KanbanColumn
          title="En Proceso"
          orders={processingOrders}
          icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
          count={processingOrders.length}
        />
        <KanbanColumn
          title="Completado"
          orders={completedOrders}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          count={completedOrders.length}
        />
      </div>
    </DndContext>
  )
}
