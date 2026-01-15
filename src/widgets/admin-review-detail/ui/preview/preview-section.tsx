interface PreviewSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PreviewSection({
  title,
  description,
  children,
  className = "",
}: PreviewSectionProps) {
  return (
    <section
      className={`bg-white border border-slate-100 rounded-2xl shadow-sm p-8 ${className}`}
    >
      <div className="mb-4">
        <h2 className="font-bold text-slate-800 text-lg">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
