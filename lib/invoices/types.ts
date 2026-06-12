export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue";

export type Currency = "INR" | "USD";

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  number: string;
  brandName: string;
  brandEmail: string;
  currency: Currency;
  status: InvoiceStatus;
  issuedOn: string;
  dueOn: string;
  paidOn: string | null;
  lineItems: InvoiceLineItem[];
  /** GST applies to INR invoices from GST-registered creators. */
  gstin: string | null;
  gstRate: number | null;
  notes: string | null;
}

export interface InvoiceTotals {
  subtotal: number;
  gstAmount: number;
  total: number;
}

export function invoiceTotals(invoice: Invoice): InvoiceTotals {
  const subtotal = invoice.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const gstAmount = invoice.gstRate ? (subtotal * invoice.gstRate) / 100 : 0;
  return { subtotal, gstAmount, total: subtotal + gstAmount };
}
