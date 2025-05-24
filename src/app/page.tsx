'use client'
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Modal }  from "@/components/modal"
import { AddNewOrder } from "@/components/modal-forms/add-new-order"

import { KanbanBoard } from "@/components/kanban-board"

type ModalType = 'exportSAP' | 'newOrder' | null;

export default function DashboardPage() {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => setCurrentModal(modalType);
  const closeModal = () => setCurrentModal(null);

  const modalContents = {
    exportSAP: {
      title: "Exportar a SAP",
      description: "Configura los parámetros de exportación",
      content: <p>hola</p>,
      size: 'md'
    },
    newOrder: {
      title: "Nuevo Pedido",
      description: "Complete los datos del nuevo pedido",
      content: <AddNewOrder onSuccess={closeModal} />,
      size: '2xl'
    }
  };

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

                <Button variant="outline" size="sm" onClick={() => openModal('exportSAP')}>
                  Exportar
                </Button>
                <Button size="sm" onClick={() => openModal('newOrder')}>
                  Nueva Orden
                </Button>
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
          {currentModal && (
            <Modal
              isOpen={!!currentModal}
              onClose={closeModal}
              title={modalContents[currentModal].title}
              description={modalContents[currentModal].description}
              size={modalContents[currentModal].size as 'sm' | 'md' | 'lg'}
            >
              {modalContents[currentModal].content}
            </Modal>
          )}
        </main>
      </div>
    </div>
  )
}
