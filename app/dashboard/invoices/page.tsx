import Link from "next/link";

import { ExternalLink, Plus } from "lucide-react";

import { InvoiceStatusBadge } from "@/components/invoices/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { mockInvoices } from "@/lib/invoices/fixtures";
import { invoiceTotals } from "@/lib/invoices/types";

export default function InvoicesPage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Send invoices with your payment details and track what's owed.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <Plus data-icon="inline-start" />
            New invoice
          </Link>
        </Button>
      </div>

      <Card size="sm">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => {
                const { total } = invoiceTotals(invoice);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{invoice.brandName}</span>
                        <span className="text-xs text-muted-foreground">
                          {invoice.brandEmail}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(invoice.issuedOn)}</TableCell>
                    <TableCell>{formatDate(invoice.dueOn)}</TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(total, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="icon" aria-label="Open invoice">
                        <a href={`/i/${invoice.id}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
