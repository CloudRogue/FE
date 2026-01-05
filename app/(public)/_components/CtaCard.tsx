import Card from "@/src/shared/ui/card";
import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

interface CtaCardProps {
  title?: string;
  description: string;
  buttonText: string;
  variant?: "hero" | "simple";
  onClick?: () => void;
}

export default function CtaCard({
  title,
  description,
  buttonText,
  variant = "hero",
  onClick,
}: CtaCardProps) {
  return (
    <Card
      as="section"
      shadow={variant === "hero" ? "sm" : "none"}
      padding="medium"
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

      <Button
        onClick={onClick}
        className="w-full rounded-xl bg-black py-3 text-white font-medium"
      >
        {buttonText}
      </Button>
    </Card>
  );
}
