import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

type Props = {
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  children: React.ReactNode;
};

export default function MyPageEligibilitySectionCard({
  title,
  isEditing,
  onToggleEdit,
  children,
}: Props) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="ttext-h2 font-semibold">{title}</h2>

        <Button
          variant="tertiary_blue"
          onClick={onToggleEdit}
          className="px-0 text-sm font-medium text-blue-600"
        >
          {isEditing ? "저장" : "수정"}
        </Button>
      </div>

      {children}
    </Card>
  );
}
