'use client';

import { Button } from "../ui/button";
import { useState } from "react";

type ExportNewOrderProps = {
    onSuccess: () => void;
}

export function AddNewOrder({onSuccess}: ExportNewOrderProps) {
    const [formData, setFormData] = useState({
      fecha: '',
      campo: '',
      cliente: '',
      lote: '',
      cant_cajas: '',
      variedad: '',
      tipo_empaque: '',
      tipo_uva: '',
      etiqueta: '',
      tipo_caja: '',
      comentario: '',
      operador: '',
      hora_operador: '',
      embarque: '',
      hora_embarque: '',
      unidad_transporte: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Lógica de exportación aquí
      onSuccess();
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="border-0">
        <div className="border-0">
          <div className="grid grid-cols-3 gap-3 space-y-2">
            <div>
              <label className="text-sm font-medium leading-none">
                Fecha
              </label>
              <input 
                id="fecha"
                type="date" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">
                Campo
              </label>
              <input
                id="campo"
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Nombre"
                value={formData.campo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none">
                Cliente
              </label>
              <select 
                id="cliente"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.cliente}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona cliente</option>
                <option value="Masters Touch">Masters Touch (1)</option>
                <option value="Molina">Molina (2)</option>
                <option value="Pandol">Pandol (3)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 space-y-2">
            <div>
              <label className="text-sm font-medium leading-none">
                Lote
              </label>
              <input 
                id="lote"
                type="number" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Numero de lote"
                value={formData.lote}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="col-span-1">
              <label className="text-sm font-medium leading-none">
                Cantidad de cajas
              </label>
              <input 
                id="cant_cajas"
                type="number" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Numero de cajas"
                value={formData.cant_cajas}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 space-y-2">
            <div className="col-span-1">
              <label className="text-sm font-medium leading-none">
                Variedad
              </label>
              <select 
                id="variedad"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.variedad}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona una opcion</option>
                <option value="Flame">Flame (1)</option>
                <option value="Early Sweet">Early Sweet (2)</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium leading-none">
                Tipo de Empaque
              </label>
              <select 
                id="tipo_empaque"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.tipo_empaque}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona una opcion</option>
                <option value="Bolsa 9x2 18lbs">Bolsa 9x2 18lbs (1)</option>
                <option value="Organico">Bolsa 10x1.5 15lbs (2)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-11 gap-3 space-y-2">
            <div className="col-span-4">
              <label className="text-sm font-medium leading-none">
                Tipo de uva
              </label>
              <select 
                id="tipo_uva"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.tipo_uva}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona una opcion</option>
                <option value="Convencional">Convencional (1)</option>
                <option value="Organico">Organico (2)</option>
              </select>
            </div>

            <div className="col-span-3">
              <label className="text-sm font-medium leading-none">
                Etiqueta
              </label>
              <select 
                id="etiqueta"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.etiqueta}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona una etiqueta</option>
                <option value="MT">MT (1)</option>
                <option value="MTO">MTO (2)</option>
              </select>
            </div>

            <div className="col-span-4">
              <label className="text-sm font-medium leading-none">
                Tipo de Caja
              </label>
              <select 
                id="tipo_caja"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                value={formData.tipo_caja}
                onChange={handleChange}>
                <option value="" disabled hidden>Selecciona tipo de caja</option>
                <option value="Exportacion">Exportacion</option>
                <option value="Nacional">Nacional</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>
          
          <div>
              <label className="text-sm font-medium leading-none">
                Comentario
              </label>
              <textarea
                id="comentario"
                className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Comentarios general"
                value={formData.comentario}
                onChange={handleChange}
              />
          </div>
        </div>

        {/* Seccion de recibidos */}

        <div className="border-0 w-full mt-3">

          <div className="grid grid-cols-10 gap-3 space-y-2">
            <div className="col-span-3">
              <label className="text-sm font-medium leading-none">
                Recibio Operador
              </label>
              <input
                id="operador"
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Nombre"
                value={formData.operador}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium leading-none">
                Hora
              </label>
              <input
                id="hora_operador"
                type="time"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder=""
                value={formData.hora_operador}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-3">
              <label className="text-sm font-medium leading-none">
                Recibio Embarque
              </label>
              <input
                id="embarque"
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder="Nombre"
                value={formData.embarque}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium leading-none">
                Hora
              </label>
              <input
                id="hora_embarque"
                type="time"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                required
                placeholder=""
                value={formData.hora_embarque}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Exportar
      </Button>
    </form>
  );
}