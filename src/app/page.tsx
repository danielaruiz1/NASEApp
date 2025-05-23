
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { KanbanBoard } from "@/components/kanban-board"
// import { OrdersTable } from "@/components/orders-table"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img src="NASELogo.jpeg" alt="logo" className="h-15 w-15"></img>
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export to SAP
                </Button>
                <Button size="sm">New Order</Button>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="sm:col-span-4 lg:col-span-8">  
                  <CardHeader>
                    <CardTitle className="text-lg font-md">Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KanbanBoard />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
