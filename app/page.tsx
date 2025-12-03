import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import Nav from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { VehicleStatus } from "@/components/vehicle-status";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Nav page={""} />
      <Hero />
      <VehicleStatus />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
