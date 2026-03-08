import { DashboardPreview } from "../components/dashboard-preview";
import { Features } from "../components/features";
import { Hero } from "../components/hero";
import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
      </main>
    </div>
  );
}
