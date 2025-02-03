export const calculateNumOfNights = (firstDate?: string, lastDate?: string) => {
  if (firstDate && lastDate) {
    const first = new Date(firstDate).getTime();
    const last = new Date(lastDate).getTime();
    return Math.max(0, (last - first) / (1000 * 60 * 60 * 24));
  }
  return 0;
};
