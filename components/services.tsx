"use client"

import { Wrench, Gauge, Battery, Cog, Droplet, Wind, LucideIcon } from "lucide-react"

interface ServiceItem {
  icon: LucideIcon
  title: string
  description: string
}

export function Services() {
  const services: ServiceItem[] = [
    {
      icon: Wrench,
      title: "Mantenimiento General",
      description:
        "Mantenimiento preventivo y correctivo para alargar la vida útil de tu vehículo.",
    },
    {
      icon: Gauge,
      title: "Diagnóstico Computarizado",
      description:
        "Tecnología de última generación para detectar problemas electrónicos con precisión.",
    },
    {
      icon: Battery,
      title: "Sistema Eléctrico",
      description:
        "Revisión y reparación de batería, alternador, motor de arranque y más.",
    },
    {
      icon: Cog,
      title: "Mecánica en General",
      description:
        "Reparación de motor, transmisión, suspensión y todos los sistemas mecánicos.",
    },
    {
      icon: Droplet,
      title: "Cambio de Aceite",
      description:
        "Servicio rápido de cambio de aceite y filtros con lubricantes de primera calidad.",
    },
    {
      icon: Wind,
      title: "Aire Acondicionado",
      description:
        "Recarga, reparación y mantenimiento del sistema de climatización de tu auto.",
    },
  ]

  return (
    <section id="servicios" className="py-20 md:py-32 ">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600">
            Ofrecemos una amplia gama de servicios automotrices con la más alta calidad y profesionalismo
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border-2 rounded-xl p-6 shadow-sm hover:border-blue-500 transition-all"
            >
              
              {/* Ícono */}
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                <service.icon className="w-6 h-6 text-blue-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>

              {/* Descripción */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
