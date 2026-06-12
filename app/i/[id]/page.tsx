import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvoiceStatusBadge } from "@/components/invoices/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { getInvoiceById } from "@/lib/invoices/fixtures";
import { invoiceTotals } from "@/lib/invoices/types";
import { getCurrentCreator } from "@/lib/session";

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: InvoicePageProps): Promise<Metadata> {
  const { id } = await params;
  const invoice = getInvoiceById(id);
  return { title: invoice ? `Invoice ${invoice.number}` : "Invoice not found" };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params;
  const invoice = getInvoiceById(id);
  if (!invoice) notFound();

  const creator = getCurrentCreator();
  const { subtotal, gstAmount, total } = invoiceTotals(invoice);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Invoice {invoice.number}
          </h1>
          <p className="text-sm text-muted-foreground">
            Issued {formatDate(invoice.issuedOn)} · Due {formatDate(invoice.dueOn)}
          </p>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </header>

      <Card size="sm">
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              From
            </span>
            <span className="font-medium">{creator.displayName}</span>
            <span className="text-muted-foreground">{creator.email}</span>
            {invoice.gstin && (
              <span className="text-muted-foreground">GSTIN {invoice.gstin}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Billed to
            </span>
            <span className="font-medium">{invoice.brandName}</span>
            <span className="text-muted-foreground">{invoice.brandEmail}</span>
          </div>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardContent className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="w-14 text-right">Qty</TableHead>
                <TableHead className="w-32 text-right">Unit price</TableHead>
                <TableHead className="w-32 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.lineItems.map((item) => (
                <TableRow key={item.description}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(item.unitPrice, invoice.currency)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(item.quantity * item.unitPrice, invoice.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="ml-auto flex w-full max-w-xs flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatCurrency(subtotal, invoice.currency)}</span>
            </div>
            {gstAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST {invoice.gstRate}%</span>
                <span className="tabular-nums">
                  {formatCurrency(gstAmount, invoice.currency)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total due</span>
              <span className="tabular-nums">{formatCurrency(total, invoice.currency)}</span>
            </div>
            {invoice.paidOn && (
              <p className="text-right text-xs text-muted-foreground">
                Paid on {formatDate(invoice.paidOn)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {invoice.status !== "paid" && (
        <Card size="sm">
          <CardHeader>
            <CardTitle>How to pay</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                UPI
              </span>
              <span className="font-medium tabular-nums">{creator.payment.upiId}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Bank transfer
              </span>
              <span>{creator.payment.accountHolder}</span>
              <span className="text-muted-foreground">
                {creator.payment.bankName} · A/C {creator.payment.accountNumber} · IFSC{" "}
                {creator.payment.ifsc}
              </span>
            </div>
            {creator.payment.paypalEmail && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  PayPal
                </span>
                <span>{creator.payment.paypalEmail}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {invoice.notes && (
        <p className="text-sm text-muted-foreground">{invoice.notes}</p>
      )}

      <footer className="flex items-center justify-center gap-1.5 pb-4 text-xs text-muted-foreground">
        Invoiced via
        <span className="font-medium text-foreground">Curately</span>
      </footer>
    </main>
  );
}
