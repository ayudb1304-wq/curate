import { InvoiceForm } from "@/components/invoices/invoice-form";
import { getCurrentCreator } from "@/lib/session";

export default function NewInvoicePage() {
  const creator = getCurrentCreator();

  return (
    <>
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">New invoice</h1>
        <p className="text-sm text-muted-foreground">
          The brand gets an email with a link to a hosted invoice page.
        </p>
      </div>
      <InvoiceForm defaultGstin={creator.gstin} />
    </>
  );
}
