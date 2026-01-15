export function formatKST(dateTime?: string | null) {
  const d = dateTime ? new Date(dateTime) : new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

export function formatDateRange(start: string, end: string) {
  const s = start.replace(/-/g, ".");
  const e = end.slice(-5).replace(/-/g, ".");
  return `${s} ~ ${e}`;
}
