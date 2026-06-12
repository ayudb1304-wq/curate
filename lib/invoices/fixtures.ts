import type { Invoice } from "./types";

/**
 * Mock invoices for the demo creator. Stand-in for the Supabase
 * invoices table until persistence lands. Brands are fictional.
 */
export const mockInvoices: Invoice[] = [
  {
    id: "inv_0011",
    number: "INV-2026-0011",
    brandName: "Aurelia Cosmetics",
    brandEmail: "partnerships@aurelia.example",
    currency: "INR",
    status: "draft",
    issuedOn: "2026-06-09",
    dueOn: "2026-06-30",
    paidOn: null,
    lineItems: [
      { description: "Static post, lip tint launch", quantity: 1, unitPrice: 8000 },
    ],
    gstin: "27ABCDE1234F1Z5",
    gstRate: 18,
    notes: null,
  },
  {
    id: "inv_0010",
    number: "INV-2026-0010",
    brandName: "FitFuel",
    brandEmail: "collabs@fitfuel.example",
    currency: "USD",
    status: "viewed",
    issuedOn: "2026-06-05",
    dueOn: "2026-06-25",
    paidOn: null,
    lineItems: [
      { description: "UGC video, protein bar, brand-owned usage", quantity: 1, unitPrice: 150 },
    ],
    gstin: null,
    gstRate: null,
    notes: "Raw footage plus one edited cut, delivered via Drive.",
  },
  {
    id: "inv_0009",
    number: "INV-2026-0009",
    brandName: "Kava Skincare",
    brandEmail: "marketing@kava.example",
    currency: "INR",
    status: "sent",
    issuedOn: "2026-06-04",
    dueOn: "2026-06-20",
    paidOn: null,
    lineItems: [
      { description: "Instagram Reel, June ambassador slot", quantity: 1, unitPrice: 18000 },
    ],
    gstin: "27ABCDE1234F1Z5",
    gstRate: 18,
    notes: "Month 4 of 6 in the ambassador agreement.",
  },
  {
    id: "inv_0008",
    number: "INV-2026-0008",
    brandName: "Suvarna Jewels",
    brandEmail: "hello@suvarna.example",
    currency: "INR",
    status: "overdue",
    issuedOn: "2026-05-12",
    dueOn: "2026-05-30",
    paidOn: null,
    lineItems: [
      { description: "Static post, festive lookbook", quantity: 1, unitPrice: 8000 },
      { description: "Story set, 3 frames with link sticker", quantity: 1, unitPrice: 5000 },
    ],
    gstin: "27ABCDE1234F1Z5",
    gstRate: 18,
    notes: null,
  },
  {
    id: "inv_0007",
    number: "INV-2026-0007",
    brandName: "Gleam Naturals",
    brandEmail: "growth@gleam.example",
    currency: "INR",
    status: "paid",
    issuedOn: "2026-05-20",
    dueOn: "2026-06-05",
    paidOn: "2026-06-02",
    lineItems: [
      { description: "Instagram Reel, vitamin C serum launch", quantity: 1, unitPrice: 18000 },
    ],
    gstin: "27ABCDE1234F1Z5",
    gstRate: 18,
    notes: "50% advance received, balance on this invoice.",
  },
];

export function getInvoiceById(id: string): Invoice | null {
  return mockInvoices.find((invoice) => invoice.id === id) ?? null;
}
