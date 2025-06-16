// Compute Next Days
const getNextDays = (n) => {
  const days = [];
  const today = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  for (let i = 1; i <= n; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    days.push(nextDay.toLocaleDateString("en-US", options));
  }

  return days;
};

module.exports = getNextDays;
