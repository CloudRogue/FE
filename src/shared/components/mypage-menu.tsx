import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "../ui/button";

export function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 px-1 text-sm font-bold text-gray-800">{title}</h2>
      <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        {children}
      </div>
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
    <Link href={link}>
      <Button className="flex w-full items-center justify-between border-b border-gray-50 p-4 last:border-none hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="text-gray-500">{icon}</div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </Button>
    </Link>
  );
}
