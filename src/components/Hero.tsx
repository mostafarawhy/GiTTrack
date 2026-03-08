"use client"

import { useState } from "react"
import { Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      console.log("Analyzing:", username)
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/15 blur-[120px]" />
        <div className="absolute right-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-neon-purple/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_2px] shadow-neon-cyan/50" />
          <span className="text-sm font-medium text-muted-foreground">Developer Analytics Platform</span>
        </div>

        {/* Gradient lines under badge */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-neon-cyan to-neon-cyan" />
          <div className="h-0.5 w-16 rounded-full bg-gradient-to-r from-neon-purple to-transparent" />
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Analyze GitHub
          <br />
          <span className="text-neon-cyan">Developer Activity</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Gain deep insights into any GitHub profile. Track repositories,
          analyze language usage, and discover developer patterns with powerful analytics.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
          <div className="relative flex items-center rounded-xl bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-neon-purple/50 p-[1px]">
            <div className="flex w-full items-center rounded-xl bg-card">
              <div className="flex items-center pl-4">
                <Globe className="h-5 w-5 text-neon-purple" />
              </div>
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-14 flex-1 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <div className="pr-2">
                <Button 
                  type="submit" 
                  className="h-10 gap-2 rounded-lg bg-card px-5 text-foreground hover:bg-muted"
                >
                  Analyze Developer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Subtext */}
        <p className="mt-6 text-sm text-muted-foreground">
          Free to use. No account required.
        </p>
      </div>
    </section>
  )
}
