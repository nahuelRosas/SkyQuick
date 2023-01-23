export const GetTime = (timestamp: { toDate: () => string | number | Date }) => {
  const time = new Date(timestamp.toDate()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const date = new Date(timestamp.toDate()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (date === today) {
    return time;
  }
  return date;
};
