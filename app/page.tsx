import Link from "next/link";

import { ArrowRight, BookUser, ReceiptText, Wallet } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BookUser,
    title: "A media kit that stays current",
    body: "Connect your accounts once. Your stats, audience breakdown, and recent posts update on their own. No more stale PDFs.",
  },
  {
    icon: ReceiptText,
    title: "Invoices brands take seriously",
    body: "Proper invoices with GST fields, due dates, and reminders. The brand gets a clean page with everything they need to pay you.",
  },
  {
    icon: Wallet,
    title: "Free for creators",
    body: "Built for creators between 1K and 500K followers. No subscription, no cut of your deals.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/aanya">Demo kit</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/onboarding">Get started</Link>
          </Button>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 py-16 sm:px-6">
        <section className="flex max-w-2xl flex-col gap-5">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Your media kit, always up to date. Your invoices, actually paid.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            Curately is the business toolkit for micro creators: a live media kit
            brands can trust and invoicing that handles GST, due dates, and
            reminders. One link for both.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/onboarding">
                Get started
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/aanya">See a live kit</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Early build. Social metrics shown are demo data until account
            connections go live.
          </p>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} size="sm">
              <CardContent className="flex flex-col gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15">
                  <feature.icon className="size-4.5 text-primary-foreground dark:text-primary" />
                </span>
                <h2 className="font-heading text-base font-medium">{feature.title}</h2>
                <p className="text-sm text-muted-foreground">{feature.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 text-xs text-muted-foreground sm:px-6">
        <span>Curately</span>
        <Link href="/dashboard" className="hover:text-foreground">
          Creator dashboard
        </Link>
      </footer>
    </div>
  );
}
