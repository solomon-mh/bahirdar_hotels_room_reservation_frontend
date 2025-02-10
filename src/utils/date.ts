export const getDateRange = (startDate: Date, endDate: Date) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate)); // Push a new Date object
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
