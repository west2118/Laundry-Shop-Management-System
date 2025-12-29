export const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay();

  // Get Monday
  const monday = new Date(now);
  const diffToMonday = day === 0 ? -6 : 1 - day;
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  // Get Sunday (end of day)
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

export const fillWeekDays = (data, monday) => {
  const map = new Map(data.map((d) => [d._id, d]));

  // ✅ MUST match monday-first loop
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const key = date.toLocaleDateString("en-CA");

    result.push({
      date: DAYS[i],
      totalAmount: map.get(key)?.totalAmount || 0,
    });
  }

  return result;
};

export const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  return { start, end };
};
