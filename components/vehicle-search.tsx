"use client"

import type React from "react"
import { useState } from "react"
import { Search, Car, AlertCircle, Loader2, Calendar, FileText, User } from "lucide-react"
import { searchVehicle } from "@/app/actions"


interface VehicleData {
  ID?: string
  FECHA?: string
  "FECHA CIERRE"?: string
  "VEHICULO ASOCIADO": string
  MODELO?: string
  "CLIENTE ASOCIADO"?: string
  clienteNombre?: string
  SEGURO?: string
  "N SINIESTRO"?: string
  AREA: string
  DESCRIPCION?: string
  [key: string]: string | undefined
}

export function VehicleSearch() {
  const [patente, setPatente] = useState("")
  const [loading, setLoading] = useState(false)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!patente.trim()) {
      setError("Por favor ingresa una patente")
      return
    }

    setLoading(true)
    setError(null)
    setVehicleData(null)

    try {
      const result = await searchVehicle(patente)

      if (result.success && result.data) {
        setVehicleData(result.data)
      } else {
        setError(result.error || "Error desconocido")
      }
    } catch {
      setError("Error al buscar el vehículo. Por favor intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const getAreaBadgeClass = (area: string) => {
    const areaLower = area.toLowerCase()
    if (areaLower.includes("entrega")) return "bg-green-500 text-white"
    if (areaLower.includes("reparacion") || areaLower.includes("taller")) return "bg-yellow-500 text-white"
    if (areaLower.includes("espera")) return "bg-orange-500 text-white"
    return "bg-blue-500 text-white"
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4">

      {/* SEARCH CONTAINER */}
      <div className="border-2 rounded-xl bg-white shadow-lg p-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Buscar por Patente</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-4">
          Ingresa la patente del vehículo para consultar su estado actual
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ej: AB 892 WE"
              value={patente}
              onChange={(e) => setPatente(e.target.value.toUpperCase())}
              className="flex-1 h-12 sm:h-14 px-4 rounded-lg border text-lg font-mono"
              maxLength={15}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Buscar
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* RESULT */}
      {vehicleData && (
        <div className="border-2 rounded-xl shadow-lg bg-white p-6 space-y-6">

          {/* BADGE ESTADO */}
          <div className="flex flex-col items-center gap-3 pb-4 border-b">
            <p className="text-sm text-gray-500">Estado del Vehículo</p>

            <span
              className={`px-6 py-3 rounded-lg text-lg font-semibold ${getAreaBadgeClass(
                vehicleData.AREA
              )}`}
            >
              {vehicleData.AREA}
            </span>
          </div>

          {/* TÍTULO */}
          <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <Car className="w-6 h-6" />
            Información del Vehículo
          </h3>

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* PATENTE */}
            <div className="bg-gray-100 p-4 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <Car className="w-4 h-4" />
                <p className="text-sm">Patente</p>
              </div>
              <p className="text-2xl font-mono font-bold">
                {vehicleData["VEHICULO ASOCIADO"]}
              </p>
            </div>

            {/* MODELO */}
            {vehicleData.MODELO && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <p className="text-sm text-gray-500">Modelo</p>
                <p className="text-xl font-semibold">{vehicleData.MODELO}</p>
              </div>
            )}

            {/* CLIENTE */}
            {vehicleData.clienteNombre && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <User className="w-4 h-4" />
                  <p className="text-sm">Cliente</p>
                </div>
                <p className="text-xl font-semibold">
                  {vehicleData.clienteNombre}
                </p>
              </div>
            )}

            {/* SEGURO */}
            {vehicleData.SEGURO && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <p className="text-sm text-gray-500">Seguro</p>
                <p className="text-xl font-semibold">{vehicleData.SEGURO}</p>
              </div>
            )}

            {/* SINIESTRO */}
            {vehicleData["N SINIESTRO"] && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1 col-span-2">
                <p className="text-sm text-gray-500">N° Siniestro</p>
                <p className="text-lg font-semibold break-all">{vehicleData["N SINIESTRO"]}</p>
              </div>
            )}

            {/* FECHAS */}
            {vehicleData.FECHA && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">Fecha de Ingreso</p>
                </div>
                <p className="text-base font-semibold">{vehicleData.FECHA}</p>
              </div>
            )}

            {vehicleData["FECHA CIERRE"] && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">Fecha de Cierre</p>
                </div>
                <p className="text-base font-semibold">
                  {vehicleData["FECHA CIERRE"]}
                </p>
              </div>
            )}
          </div>

          {/* DESCRIPCIÓN DEL TRABAJO */}
          {vehicleData.DESCRIPCION && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold">Descripción del Trabajo</h3>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {vehicleData.DESCRIPCION}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
