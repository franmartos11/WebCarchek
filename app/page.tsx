import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { VehicleStatus } from "@/components/vehicle-status";
import { Contact } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <VehicleStatus />
      <Services />
      <About />
      
      <Footer />
    </main>
  );
}
