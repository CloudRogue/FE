import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";
import Link from "next/link";

interface CtaCardProps {
  title?: string;
  description: string;
  buttonText: string;
  variant?: "hero" | "simple";
  href: string;
}

export default function CtaCard({
  title,
  description,
  buttonText,
  variant = "hero",
  href,
}: CtaCardProps) {
  return (
    <Card
      as="section"
      className={cn(
        "flex flex-col gap-4",
        variant === "hero"
          ? "text-left"
          : "border-2 border-dashed border-gray-300 text-center bg-transparent",
      )}
    >
      <div className="space-y-1">
        {title && (
          <h1 className="text-xl font-bold whitespace-pre-line leading-tight">
            {title}
          </h1>
        )}
        <p
          className={cn(
            "font-medium",
            variant === "hero"
              ? "text-sm text-gray-500"
              : "text-base text-foreground",
          )}
        >
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="w-full rounded-xl bg-black py-3 text-white font-medium text-center block transition-colors hover:bg-gray-800"
      >
        {buttonText}
      </Link>
    </Card>
  );
}
