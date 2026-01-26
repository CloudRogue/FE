export const calculateDDay = (targetDate: string | null) => {
  if (!targetDate) return null;
  const diff = new Date(targetDate).getTime() - new Date().setHours(0, 0, 0, 0);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};
