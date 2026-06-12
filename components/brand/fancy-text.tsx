import { cn } from "@/lib/utils";

/**
 * Renders the first character in the cursive accent font and the rest
 * in the surrounding font. Used for names and the wordmark.
 */
export function FancyText({ text, className }: { text: string; className?: string }) {
  const chars = [...text];
  if (chars.length === 0) return null;
  const first = chars[0];
  const rest = chars.slice(1).join("");

  return (
    <span className={className}>
      <span aria-hidden className="font-cursive mr-px text-[1.25em] font-normal">
        {first}
      </span>
      <span aria-hidden>{rest}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
