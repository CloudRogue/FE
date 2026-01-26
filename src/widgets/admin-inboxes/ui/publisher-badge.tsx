import cn from "@/src/shared/lib/cn";

type PublisherBadgeProps = {
  publisher: "LH" | "SH";
};

const LABEL: Record<PublisherBadgeProps["publisher"], string> = {
  LH: "LH",
  SH: "SH",
};

export default function PublisherBadge({ publisher }: PublisherBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1 text-xs font-medium",
        publisher === "LH" && "bg-blue-50 text-blue-700",
        publisher === "SH" && "bg-green-50 text-green-700",
      )}
    >
      {LABEL[publisher]}
    </span>
  );
}
