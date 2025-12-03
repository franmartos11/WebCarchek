"use client"

import React, { useState } from "react"
import { X } from "lucide-react"

export function Appointment() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    patente: "",
    fecha: "",
    horario: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)

  const horariosDisponibles = [
    "08:00 AM", "09:00 AM", "10:00 AM",
    "11:00 AM", "12:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM"
  ]

  const minDate = new Date().toISOString().split("T")[0]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(res => setTimeout(res, 1000))

      setAppointmentDetails({ ...formData })
      setShowConfirmation(true)

      setFormData({
        nombre: "",
        telefono: "",
        patente: "",
        fecha: "",
        horario: "",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="agendar" className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">

        {/* ---------------------- MODAL ---------------------- */}
        {showConfirmation && appointmentDetails && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl animate-fade">

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-600 text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Cita Confirmada</h3>
                    <p className="text-sm text-gray-500">Tu reserva ha sido registrada</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Detalles */}
              <div className="space-y-4 bg-gray-100 rounded-lg p-4">

                <div>
                  <p className="text-xs text-gray-500">Cliente</p>
                  <p className="font-medium">{appointmentDetails.nombre}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Teléfono</p>
                  <p className="font-medium">{appointmentDetails.telefono}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Vehículo</p>
                  <p className="font-medium">{appointmentDetails.patente}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Fecha</p>
                  <p className="font-medium capitalize">{formatDate(appointmentDetails.fecha)}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Horario</p>
                  <p className="font-medium">{appointmentDetails.horario}</p>
                </div>
              </div>

              {/* Mensaje */}
              <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
                <p className="text-sm text-blue-700">
                  Nos pondremos en contacto contigo para confirmar la disponibilidad de tu cita.
                </p>
              </div>

              {/* Botón */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-blue-600 text-white mt-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                Entendido
              </button>

            </div>
          </div>
        )}

        {/* ---------------------- FORM ---------------------- */}

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Agenda tu Cita</h2>
        <p className="text-gray-600 text-center mb-8">Reserva tu espacio de forma rápida y sencilla</p>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="text-sm font-medium">Nombre completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="mt-1 w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  required
                  className="mt-1 w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Patente del vehículo</label>
                <input
                  type="text"
                  value={formData.patente}
                  onChange={(e) => setFormData({ ...formData, patente: e.target.value.toUpperCase() })}
                  required
                  className="mt-1 w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Fecha preferida</label>
                <input
                  type="date"
                  min={minDate}
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  required
                  className="mt-1 w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

            </div>

            <div>
              <label className="text-sm font-medium">Horario preferido</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-2">
                {horariosDisponibles.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setFormData({ ...formData, horario: h })}
                    className={`py-2 rounded-lg border text-sm transition 
                      ${formData.horario === h ? 
                        "bg-blue-600 text-white border-blue-600" :
                        "border-gray-300 hover:bg-gray-100"}
                    `}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.horario}
              className="w-full bg-blue-600 text-white h-12 rounded-lg text-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isLoading ? "Agendando..." : "Agendar Cita"}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}
