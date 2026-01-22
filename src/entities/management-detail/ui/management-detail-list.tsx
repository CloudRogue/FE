import { AnnouncementDocument } from "@/src/entities/management-detail";

interface ManagementDocumentListProps {
  documents: AnnouncementDocument[];
}

export function ManagementDocumentList({
  documents,
}: ManagementDocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400 bg-white rounded-xl">
        제출할 서류가 없습니다.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {documents.map((doc) => (
        <li key={doc.id} className="text-h4 font-medium">
          {doc.name}
        </li>
      ))}
    </ul>
  );
}
