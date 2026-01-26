import Card from "@/src/shared/ui/card";
import Right from "@/src/shared/ui/icons/arroaw/right.svg";
import Link from "next/link";

export function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-h2">{title}</h2>
      <Card className="p-0">{children}</Card>
    </section>
  );
}

export function MenuItem({
  link,
  icon,
  label,
}: {
  link: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={link} className="flex justify-between p-4 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <Right />
    </Link>
  );
}
