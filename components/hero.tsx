import { ArrowRight, Wrench } from "lucide-react"
import { Button } from "./header"

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Wrench className="w-4 h-4" />
              <span>Más de 20 años de experiencia</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Tu taller mecánico de confianza
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
              Mantenimiento, reparaciones y diagnóstico profesional para tu vehículo. Tecnología de punta y atención
              personalizada para mantener tu auto en perfecto estado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button  className="gap-2 text-base">
                Agendar Servicio
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button className="text-base bg-transparent">
                Ver Servicios
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Años experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Clientes felices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl" />
            <img
              src="/modern-auto-repair-shop-with-professional-mechanic.jpg"
              alt="Taller mecánico profesional"
              className="relative rounded-3xl object-cover w-full h-full shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
