import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LyvianLogo from "@/components/LyvianLogo";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <LyvianLogo />
          <Button onClick={() => navigate("/login")} variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 items-center">
        <div className="container max-w-3xl py-16 text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="text-primary" size={28} />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Healthcare communication,{" "}
            <span className="text-primary">simplified</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            Lyvian connects doctors, nurses, patients, and families in one secure platform.
            No complex EMR — just clear, effective communication.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
              Get Started <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
              Patient Registration
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 text-left">
            {[
              { icon: Users, title: "Network-Based", desc: "Multi-tenant architecture connecting care teams across organizations" },
              { icon: Shield, title: "Invite-Only Patients", desc: "Patients join through secure invite links from their care providers" },
              { icon: Heart, title: "Communication First", desc: "Chat, education sharing, and lightweight patient snapshots" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
