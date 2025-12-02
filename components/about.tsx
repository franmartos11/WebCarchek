import { Award, Users, Clock, Shield } from "lucide-react"

// === Custom Card Components ===
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className=" rounded-2xl shadow-md border ">
      {children}
    </div>
  )
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>
}

// === About Section ===
export function About() {
  const features = [
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Certificaciones y garantía en todos nuestros servicios",
    },
    {
      icon: Users,
      title: "Equipo Profesional",
      description: "Mecánicos certificados con años de experiencia",
    },
    {
      icon: Clock,
      title: "Servicio Rápido",
      description: "Respetamos tu tiempo con servicios eficientes",
    },
    {
      icon: Shield,
      title: "Repuestos Originales",
      description: "Solo utilizamos repuestos de primera calidad",
    },
  ]

  return (
    <section id="nosotros" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Imagen */}
          <div className="relative lg:h-[500px] order-2 lg:order-1">
            <img
              src="/professional-mechanics-team-at-auto-repair-shop.jpg"
              alt="Equipo de mecánicos profesionales"
              className="rounded-3xl object-cover w-full h-full shadow-2xl"
            />
          </div>

          {/* Texto + Features */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Sobre Nosotros
              </h2>

              <p className="text-lg text-muted-foreground">
                Somos un taller mecánico con más de 20 años de experiencia,
                especializado en mantenimiento y reparación de vehículos de
                todas las marcas. Nuestro compromiso es brindar un servicio de
                excelencia con atención personalizada.
              </p>

              <p className="text-lg text-muted-foreground">
                Contamos con tecnología de última generación y un equipo de
                mecánicos altamente capacitados para garantizar que tu vehículo
                reciba el mejor cuidado posible.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardContent>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>

                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
