import { VehicleSearch } from "@/components/vehicle-search"

export function VehicleStatus() {
  return (
    <section id="consultar" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Consulta el Estado de tu Vehículo
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Ingresa la patente de tu vehículo para ver el estado actual de tu servicio o reparación en tiempo real
          </p>
        </div>

        <VehicleSearch />
      </div>
    </section>
  )
}
