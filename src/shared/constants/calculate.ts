export const CalculatePriceParking = (timeIn: Date, timeOut: Date): number => {
  if (!timeOut) return 0; // Jika time_out belum ada, harga = 0
  const duration = (timeOut.getTime() - timeIn.getTime()) / (1000 * 60 * 60);

  const baseRate = 4000;
  const hourlyRateAfterFirstHour = 2000;
  const nightRate = 10000;
  const stayOnDay = 50000;
  const totalCost = [baseRate];
  const times = [timeIn.getHours()];

  let hour = timeIn.getHours();
  for (let i = 0; i < Math.floor(duration); i++) {
    hour += 1;
    if (hour > 23) {
      hour = 0;
    }
    times.push(hour);
    if (hour >= 23 || hour <= 6) {
      totalCost.push(nightRate);
    } else {
      totalCost.push(hourlyRateAfterFirstHour);
    }
  }

  const stayForOneDay = Math.floor(times.length / 24) * stayOnDay;
  return totalCost.reduce((a, b) => a + b, 0) + stayForOneDay;
};
