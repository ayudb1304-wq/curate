"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import type { Currency } from "@/lib/invoices/types";

interface FormLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceFormProps {
  defaultGstin: string | null;
}

export function InvoiceForm({ defaultGstin }: InvoiceFormProps) {
  const router = useRouter();

  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [dueOn, setDueOn] = useState("");
  const [gstin, setGstin] = useState(defaultGstin ?? "");
  const [gstRate, setGstRate] = useState(defaultGstin ? 18 : 0);
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<FormLineItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gstApplies = currency === "INR" && gstin.trim() !== "" && gstRate > 0;
  const gstAmount = gstApplies ? (subtotal * gstRate) / 100 : 0;
  const total = subtotal + gstAmount;

  const submit = (action: "draft" | "send") => {
    if (action === "send" && (!brandName || !brandEmail || subtotal <= 0)) {
      toast.error("Add the brand, their email, and at least one line item first.");
      return;
    }
    toast.success(action === "send" ? "Invoice sent (demo)" : "Draft saved (demo)", {
      description: "Real sending and saving arrive with accounts and email setup.",
    });
    router.push("/dashboard/invoices");
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-6">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Bill to</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brand-name">Brand</Label>
              <Input
                id="brand-name"
                value={brandName}
                onChange={(event) => setBrandName(event.target.value)}
                placeholder="Brand or agency name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brand-email">Email</Label>
              <Input
                id="brand-email"
                type="email"
                value={brandEmail}
                onChange={(event) => setBrandEmail(event.target.value)}
                placeholder="accounts@brand.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR, Indian rupee</SelectItem>
                  <SelectItem value="USD">USD, US dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="due-on">Due date</Label>
              <Input
                id="due-on"
                type="date"
                value={dueOn}
                onChange={(event) => setDueOn(event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Line items</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {lineItems.map((item, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[3fr_5rem_8rem_auto]">
                <div className="flex flex-col gap-1.5">
                  {index === 0 && <Label>Description</Label>}
                  <Input
                    value={item.description}
                    onChange={(event) =>
                      setLineItems((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, description: event.target.value } : row,
                        ),
                      )
                    }
                    placeholder="Instagram Reel, 30 to 60 seconds"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {index === 0 && <Label>Qty</Label>}
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) =>
                      setLineItems((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, quantity: Number(event.target.value) } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {index === 0 && <Label>Unit price</Label>}
                  <Input
                    type="number"
                    min={0}
                    value={item.unitPrice}
                    onChange={(event) =>
                      setLineItems((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, unitPrice: Number(event.target.value) } : row,
                        ),
                      )
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  aria-label="Remove line item"
                  disabled={lineItems.length === 1}
                  onClick={() => setLineItems((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                setLineItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }])
              }
            >
              <Plus data-icon="inline-start" />
              Add line item
            </Button>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Tax</CardTitle>
            <CardDescription>
              GST applies to INR invoices when you have a GSTIN. Leave blank if not registered.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input
                id="gstin"
                value={gstin}
                onChange={(event) => setGstin(event.target.value)}
                placeholder="27ABCDE1234F1Z5"
                disabled={currency !== "INR"}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gst-rate">GST rate %</Label>
              <Input
                id="gst-rate"
                type="number"
                min={0}
                max={28}
                value={gstRate}
                onChange={(event) => setGstRate(Number(event.target.value))}
                disabled={currency !== "INR"}
              />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Deliverables, usage rights, payment terms."
            />
          </CardContent>
        </Card>
      </div>

      <Card size="sm" className="lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatCurrency(subtotal, currency)}</span>
          </div>
          {gstApplies && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST {gstRate}%</span>
              <span className="tabular-nums">{formatCurrency(gstAmount, currency)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total, currency)}</span>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <Button onClick={() => submit("send")}>
              <Send data-icon="inline-start" />
              Send invoice
            </Button>
            <Button variant="outline" onClick={() => submit("draft")}>
              Save as draft
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            The invoice includes your payment details from settings: UPI, bank
            transfer, and PayPal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
