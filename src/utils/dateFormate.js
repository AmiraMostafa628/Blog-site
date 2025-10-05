export function getFormattedDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "short" });
  const hour = now.getHours();
  const minute = now.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${day} ${month} - ${formattedHour}:${formattedMinute} ${ampm}`;
}
