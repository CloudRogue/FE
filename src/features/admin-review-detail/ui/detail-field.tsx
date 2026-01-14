import Field from "@/src/shared/ui/field";
import Label from "@/src/shared/ui/label";

export function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Field className="flex flex-col gap-2">
      <Label htmlFor={label} className="text-sm font-bold text-slate-600">
        {label}
      </Label>
      {children}
    </Field>
  );
}
