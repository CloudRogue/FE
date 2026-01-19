/** YYYY.MM.DD 형식으로 변환 */
export const formatToDotDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "")
    .slice(0, -1);
};

export const formatDateStr = (dateStr?: string | null) => {
  if (!dateStr) return "일정 미정";
  return `${dateStr.replace(/-/g, ".")} 00시`;
};
