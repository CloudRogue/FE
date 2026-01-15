import { Badge } from "@/src/shared/ui/badge";

export const ManagementDocumentItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-4 flex justify-between items-center bg-white rounded-xl">
    <div className="min-w-0">
      <p className="font-bold text-slate-800 truncate">{title}</p>
      <p className="text-sm text-slate-400 truncate">{description}</p>
    </div>
    <Badge className="bg-slate-100 text-slate-400 font-bold px-2 py-1 rounded-md shrink-0 ml-2">
      발급처
    </Badge>
  </div>
);
