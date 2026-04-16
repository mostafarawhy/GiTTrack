"use client";

import { useState } from "react";
import { Globe, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractGitHubUsername } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { DashboardPreview } from "@/components/dashboard-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUser, GitHubUserNotFoundError } from "@/lib/github";

export function Hero() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidOpen, setInvalidOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userName = extractGitHubUsername(userInput);
      if (!userName) return;
      setLoading(true);
      await getUser(userName);
      router.push(`/users/${userName}`);
    } catch (error) {
      if (error instanceof GitHubUserNotFoundError) {
        setInvalidOpen(true);
        return;
      }
      console.error("Unexpected GitHub lookup error:", error);
      setInvalidOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "1px",
                background: "oklch(0.28 0.004 264)",
              }}
            />
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(0.42 0.004 264)",
              }}
            >
              Developer Analytics
            </span>
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "1px",
                background: "oklch(0.28 0.004 264)",
              }}
            />
          </div>

          {/* headline */}
          <h1
            className="mt-24 mb-6 text-balance text-foreground"
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Analyze GitHub
            <br />
            <h1 className="text-primary">Developer Activity</h1>
          </h1>

          {/* subhead */}
          <p
            className="mx-auto mb-10 max-w-md text-pretty leading-relaxed"
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "oklch(0.58 0.004 264)",
            }}
          >
            Deep insights into any GitHub profile. Track repositories, language
            distribution, and developer patterns — no account required.
          </p>

          {/* search bar */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid oklch(0.17 0.004 264)",
                borderRadius: "6px",
                background: "oklch(0.11 0.004 264)",
              }}
              onFocusCapture={(e) =>
                (e.currentTarget.style.borderColor = "oklch(0.28 0.004 264)")
              }
              onBlurCapture={(e) =>
                (e.currentTarget.style.borderColor = "oklch(0.17 0.004 264)")
              }
            >
              <div className="flex items-center pl-4">
                <Globe
                  className="h-4 w-4"
                  style={{ color: "oklch(0.38 0.004 264)" }}
                />
              </div>

              <input
                type="text"
                placeholder="Enter GitHub username or link..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{
                  flex: 1,
                  height: "48px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "0 16px",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "13px",
                  color: "oklch(0.91 0.004 264)",
                }}
              />

              <div style={{ padding: "0 6px" }}>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: "36px",
                    padding: "0 16px",
                    background: "oklch(0.62 0.13 250)",
                    color: "oklch(0.98 0 0)",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {loading ? "Checking..." : "Analyze"}
                  {!loading && <ArrowRight style={{ width: 13, height: 13 }} />}
                </Button>
              </div>
            </div>
          </form>

          {/* meta */}
          <p
            className="mt-5"
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: "oklch(0.32 0.004 264)",
              letterSpacing: "0.04em",
            }}
          >
            Free to use &nbsp;·&nbsp; No account required
          </p>

          <DashboardPreview />
        </div>
      </section>

      <Dialog open={invalidOpen} onOpenChange={setInvalidOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                style={{
                  borderRadius: "6px",
                  padding: "8px",
                  background: "oklch(0.58 0.18 25 / 0.12)",
                  color: "oklch(0.58 0.18 25)",
                  display: "flex",
                }}
              >
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle>User not found</DialogTitle>
                <p
                  style={{
                    marginTop: "3px",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    color: "oklch(0.42 0.004 264)",
                  }}
                >
                  That GitHub username could not be found.
                </p>
              </div>
            </div>
          </DialogHeader>
          <div
            style={{
              borderRadius: "6px",
              border: "1px solid oklch(0.17 0.004 264)",
              background: "oklch(0.11 0.004 264)",
              padding: "14px 16px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "12px",
              color: "oklch(0.52 0.004 264)",
              lineHeight: 1.6,
            }}
          >
            Check the username or profile link and try again.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
