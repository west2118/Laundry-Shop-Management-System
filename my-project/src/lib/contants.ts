export const dateConvert = (date?: string) => {
  if (!date) return "";
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const statusColor = [
  { label: "Pending", color: "#FACC15" },
  { label: "Ready", color: "#22C55E" },
  { label: "Picked Up", color: "#3B82F6" },
  { label: "Total Orders", color: "#A855F7" },
];
