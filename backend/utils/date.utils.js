export const fillWeekDays = (data, monday) => {
  const map = new Map(data.map((d) => [d._id, d]));

  // ✅ MUST match monday-first loop
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = [];

  const dateRange = getWeekRangeLabel(monday);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const key = date.toLocaleDateString("en-CA");

    result.push({
      date: DAYS[i],
      totalAmount: map.get(key)?.totalAmount || 0,
      totalOrders: map.get(key)?.totalOrders || 0,
    });
  }

  const totalRevenue = result.reduce(
    (sum, total) => sum + total.totalAmount,
    0
  );

  return {
    chartData: result,
    totalRevenue,
    dateRange,
  };
};

export const fillYearMonths = (data) => {
  const map = new Map(data.map((d) => [d._id, d]));

  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = [];

  for (let i = 1; i <= 12; i++) {
    const monthData = map.get(i);

    result.push({
      date: MONTHS[i - 1],
      totalAmount: monthData?.totalAmount || 0,
      totalOrders: monthData?.totalOrders || 0,
    });
  }

  const totalRevenue = result.reduce(
    (sum, total) => sum + total.totalAmount,
    0
  );

  const totalOrders = result.reduce((sum, total) => sum + total.totalOrders, 0);

  return {
    chartData: result,
    totalRevenue,
    totalOrders,
  };
};

export const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  return { start, end };
};

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

export const getMonthlyRange = () => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return { startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth };
};

export const getYearlyRange = () => {
  const year = new Date().getFullYear();

  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  return { start: startOfYear, end: endOfYear };
};

export const getWeekRangeLabel = (monday) => {
  const start = new Date(monday);
  const end = new Date(monday);
  end.setDate(start.getDate() + 6);

  const sameMonth = start.getMonth() === end.getMonth();

  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const endLabel = end.toLocaleDateString("en-US", {
    month: sameMonth ? undefined : "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
};
