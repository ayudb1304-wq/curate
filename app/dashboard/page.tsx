import Link from "next/link";

import { ArrowRight, AtSign, CircleCheck, Eye } from "lucide-react";

import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { InvoiceStatusBadge } from "@/components/invoices/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { invoiceTotals, type Currency } from "@/lib/invoices/types";
import { getKitByHandle } from "@/lib/kit/data";
import { getCurrentCreator } from "@/lib/session";

function totalsByCurrency(statuses: string[]): Array<{ currency: Currency; amount: number }> {
  const sums = new Map<Currency, number>();
  for (const invoice of mockInvoices) {
    if (!statuses.includes(invoice.status)) continue;
    const { total } = invoiceTotals(invoice);
    sums.set(invoice.currency, (sums.get(invoice.currency) ?? 0) + total);
  }
  return [...sums.entries()].map(([currency, amount]) => ({ currency, amount }));
}

function MoneyLines({ totals }: { totals: Array<{ currency: Currency; amount: number }> }) {
  if (totals.length === 0) {
    return <span className="text-2xl font-semibold tabular-nums">0</span>;
  }
  const [first, ...rest] = totals;
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold tabular-nums">
        {formatCurrency(first.amount, first.currency)}
      </span>
      {rest.map((entry) => (
        <span key={entry.currency} className="text-sm text-muted-foreground tabular-nums">
          + {formatCurrency(entry.amount, entry.currency)}
        </span>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const creator = getCurrentCreator();
  const kit = await getKitByHandle(creator.handle);

  const outstanding = totalsByCurrency(["sent", "viewed", "overdue"]);
  const paid = totalsByCurrency(["paid"]);
  const overdueCount = mockInvoices.filter((invoice) => invoice.status === "overdue").length;

  const checklist = [
    { label: "Add your bio", done: Boolean(kit?.bio) },
    { label: "Set your rate card", done: (kit?.rateCard.length ?? 0) > 0 },
    { label: "Add past collaborations", done: (kit?.collabs.length ?? 0) > 0 },
    { label: "Add payment details", done: Boolean(creator.payment.upiId) },
    { label: "Connect a second platform", done: false },
  ];
  const doneCount = checklist.filter((item) => item.done).length;

  return (
    <>
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Your kit, your invoices, and what needs attention.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Outstanding</CardDescription>
            <MoneyLines totals={outstanding} />
            {overdueCount > 0 && (
              <span className="text-xs text-destructive">
                {overdueCount} invoice{overdueCount > 1 ? "s" : ""} overdue
              </span>
            )}
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Paid this month</CardDescription>
            <MoneyLines totals={paid} />
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Kit views, 30 days</CardDescription>
            <span className="text-2xl font-semibold tabular-nums">128</span>
            <span className="text-xs text-muted-foreground">Demo data</span>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Connected accounts</CardDescription>
            <span className="inline-flex items-center gap-1.5 text-2xl font-semibold">
              1
              <Badge variant="outline">
                <AtSign data-icon="inline-start" />
                {kit?.platform.username}
              </Badge>
            </span>
            <span className="text-xs text-muted-foreground">
              Synced {kit?.metrics?.lastSyncedAt ? formatDate(kit.metrics.lastSyncedAt) : "never"}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start gap-3 lg:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Your public kit</CardTitle>
            <CardDescription>curately.com/{creator.handle}</CardDescription>
            <CardAction className="flex gap-2">
              <CopyLinkButton path={`/${creator.handle}`} />
              <Button asChild size="sm" variant="outline">
                <a href={`/${creator.handle}`} target="_blank" rel="noopener noreferrer">
                  <Eye data-icon="inline-start" />
                  Preview
                </a>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Share this link in pitches and your link-in-bio. It updates whenever your
            connected accounts sync or you edit your kit.
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Complete your profile</CardTitle>
            <CardDescription>
              {doneCount} of {checklist.length} done
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Progress value={(doneCount / checklist.length) * 100} />
            <ul className="flex flex-col gap-1.5">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm">
                  <CircleCheck
                    className={`size-4 ${item.done ? "text-primary" : "text-muted-foreground/40"}`}
                  />
                  <span className={item.done ? "" : "text-muted-foreground"}>{item.label}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
          <CardAction>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/invoices">
                View all
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.slice(0, 4).map((invoice) => {
                const { total } = invoiceTotals(invoice);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>{invoice.brandName}</TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>{formatDate(invoice.dueOn)}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(total, invoice.currency)}
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
