import ShortenForm from "@/components/ShortenForm";
import { Zap, Shield, Sparkles, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-brand-green/30">
      {/* Fondo con brillo radial */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        {/* Badge superior */}
        <div className="border-2 border-brand-green inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-green/20 text-sm font-medium text-brand-green mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Sparkles size={16} fill="currentColor" />
          <span>Acorta enlaces en segundos</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 text-center max-w-4xl space-y-8 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Transforma tus <span className="text-green-500">URLs</span>
            <br />
            <span className="text-zinc-500">en enlaces memorables</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Crea enlaces cortos, limpios y profesionales. Comparte con confianza
            en cualquier plataforma.
          </p>
        </div>

        {/* Formulario */}
        <ShortenForm />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl">
          <FeatureCard
            icon={<Zap size={24} className="text-brand-green" fill="currentColor" />}
            title="Ultra rápido"
            description="Enlaces generados en milisegundos para que no pierdas tiempo."
          />
          <FeatureCard
            icon={<Shield size={24} className="text-brand-green" />}
            title="Seguro"
            description="Enlaces protegidos y confiables para tus usuarios."
          />
          <FeatureCard
            icon={<Star size={24} className="text-brand-green" fill="currentColor" />}
            title="Simple"
            description="Sin registro, sin complicaciones desde el primer día."
          />
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="relative z-10 border-t border-border-gray py-12 mt-auto">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Snip.io
          <div className="mt-2 flex items-center justify-center gap-1.5">
            por{" "}
            <a
              href="https://github.com/mnavarro77"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-brand-green transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              mnavarro77
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-2xl glass-panel hover-scale border-transparent hover:border-brand-green/20">
      <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

