"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VERTICALS = ["Beauty", "Fashion", "Fitness", "Food", "Travel", "Tech", "Other"];
const COUNTRIES = ["India", "United States", "United Kingdom", "UAE", "Other"];
const BANDS = ["1K to 10K", "10K to 100K", "100K to 500K"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [vertical, setVertical] = useState("");
  const [country, setCountry] = useState("");
  const [band, setBand] = useState("");

  const steps = [
    {
      title: "About you",
      valid: name.trim() !== "" && email.includes("@"),
    },
    {
      title: "Claim your kit link",
      valid: handle.trim().length >= 3,
    },
    {
      title: "Your niche",
      valid: vertical !== "" && country !== "" && band !== "",
    },
  ];

  const finish = () => {
    toast.success("You're set", {
      description: "Demo onboarding. Real accounts arrive with Supabase auth.",
    });
    router.push("/dashboard");
  };

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <Link href="/" className="flex items-center gap-2 self-center">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="size-4 text-primary-foreground" />
        </span>
        <span className="font-heading text-base font-semibold">Curately</span>
      </Link>

      <div className="flex flex-col gap-2">
        <Progress value={((step + 1) / steps.length) * 100} />
        <p className="text-xs text-muted-foreground">
          Step {step + 1} of {steps.length}: {steps[step].title}
        </p>
      </div>

      <Card size="sm">
        <CardContent className="flex flex-col gap-4">
          {step === 0 && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Aanya Sharma"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="handle">Handle</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">curately.com/</span>
                <Input
                  id="handle"
                  value={handle}
                  onChange={(event) =>
                    setHandle(event.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))
                  }
                  placeholder="yourname"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This becomes your public kit link. You can't change it later, pick carefully.
              </p>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label>Vertical</Label>
                <Select value={vertical} onValueChange={setVertical}>
                  <SelectTrigger>
                    <SelectValue placeholder="What do you create?" />
                  </SelectTrigger>
                  <SelectContent>
                    {VERTICALS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where are you based?" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Follower band</Label>
                <Select value={band} onValueChange={setBand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Your biggest platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANDS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="flex justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft data-icon="inline-start" />
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button size="sm" disabled={!steps[step].valid} onClick={() => setStep((s) => s + 1)}>
                Continue
                <ArrowRight data-icon="inline-end" />
              </Button>
            ) : (
              <Button size="sm" disabled={!steps[step].valid} onClick={finish}>
                <CircleCheck data-icon="inline-start" />
                Finish
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
