function getDate() {
  // get html element
  const dateElement = document.querySelector(".todo__date");
  const timeElement = document.querySelector(".todo__time");

  const currentDate = new Date();
  // Get various components of the current date and time
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const time = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  dateElement.innerHTML = `
    <sup class="todo__date-day">${day}</sup>
    <span class="todo__date-month">${monthName}</span>
    <sub class="todo__date-year">${year}</sub>
  `;
  timeElement.innerHTML = `${time}`;
}
window.addEventListener("load", getDate);
setInterval(getDate, 1000);