"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyLinkButton({ path, label = "Copy link" }: { path: string; label?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(`${window.location.origin}${path}`);
        toast.success("Link copied");
      }}
    >
      <Copy data-icon="inline-start" />
      {label}
    </Button>
  );
}
