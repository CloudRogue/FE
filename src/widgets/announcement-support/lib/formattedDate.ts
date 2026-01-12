export function formattedDate(isoString: string): string {
  if (!isoString) return "0000.00.00 00:00";
  const date = new Date(isoString);
  return date
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\. /g, ".")
    .replace(/.$/, "");
}
