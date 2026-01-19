import { AnnouncementDocument } from "@/src/entities/management-detail";
import { Badge } from "@/src/shared/ui/badge";

interface ManagementDocumentListProps {
  documents: AnnouncementDocument[];
  type: "APPLY" | "DOC_RESULT";
}

const getDocumentDescription = (
  type: "APPLY" | "DOC_RESULT",
  scope: string,
) => {
  if (type === "APPLY") {
    return scope === "COMMON" ? "공통 제출 서류" : "대상자 한정";
  }
  return scope === "TARGET_ONLY" ? "해당자 추가 제출" : "공통 서류";
};

export function ManagementDocumentList({
  documents,
  type,
}: ManagementDocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400 bg-white rounded-xl">
        제출할 서류가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((doc) => (
        <ManagementDocumentItem
          key={doc.id}
          title={doc.name}
          description={getDocumentDescription(type, doc.scope)}
        />
      ))}
    </div>
  );
}

interface ManagementDocumentItemProps {
  title: string;
  description: string;
}

const ManagementDocumentItem = ({
  title,
  description,
}: ManagementDocumentItemProps) => (
  <div className="p-4 flex justify-between items-center bg-white rounded-b-xl">
    <div className="min-w-0">
      <p className="font-bold text-slate-800 truncate">{title}</p>
      <p className="text-sm text-slate-400 truncate">{description}</p>
    </div>
    <Badge className="bg-slate-100 text-slate-400 font-bold px-2 py-1 rounded-md shrink-0 ml-2">
      발급처
    </Badge>
  </div>
);
