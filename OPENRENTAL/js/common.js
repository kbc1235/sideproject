document.addEventListener("DOMContentLoaded", function () {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const trigger = customSelect.querySelector(".custom-select-trigger");
    const options = customSelect.querySelectorAll(".custom-option");

    trigger.addEventListener("click", function () {
      customSelect.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;
        trigger.querySelector("span").textContent = text;
        customSelect.classList.remove("open");
        options.forEach((opt) => opt.classList.remove("selected"));
        this.classList.add("selected");
      });
    });

    document.addEventListener("click", function (e) {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("open");
      }
    });
  });

  //   캘린더
  const calendarInputs = document.querySelectorAll(".calendar-input");
  let activeInput = null;
  let activeCalendar = null;
  let startDate = null;

  // Add event listeners to period buttons
  const periodButtons = document.querySelectorAll(".btn-period");
  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const period = this.getAttribute("data-period");
      const startDateInput = calendarInputs[0];
      const endDateInput = calendarInputs[1];
      let endDate = "";

      if (period !== "all") {
        const monthsToAdd = parseInt(period, 10);
        const currentDate = new Date();
        startDateInput.value = currentDate.toISOString().split("T")[0]; // Set today's date in the first input
        currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
        endDate = currentDate.toISOString().split("T")[0];
      } else {
        startDateInput.value = "";
      }

      endDateInput.value = endDate;

      // Update button styles
      periodButtons.forEach((btn) => btn.classList.remove("primary"));
      this.classList.add("primary");
    });
  });

  calendarInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      if (activeCalendar) {
        document.body.removeChild(activeCalendar);
      }

      activeInput = input;
      let initialDate = new Date();
      if (activeInput === calendarInputs[1] && startDate) {
        initialDate = startDate;
      }

      const calendar = document.createElement("div");
      calendar.className = "calendar-popup";
      calendar.innerHTML = generateCalendarHTML(initialDate);
      document.body.appendChild(calendar);
      activeCalendar = calendar;

      const rect = input.getBoundingClientRect();
      const calendarRect = calendar.getBoundingClientRect();

      let top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;

      // Adjust position if calendar overflows the viewport
      if (left + calendarRect.width > window.innerWidth) {
        left = window.innerWidth - calendarRect.width - 10; // 10px padding from the edge
      }
      if (top + calendarRect.height > window.innerHeight) {
        top = rect.top + window.scrollY - calendarRect.height;
      }

      calendar.style.top = `${top}px`;
      calendar.style.left = `${left}px`;

      calendar.addEventListener("click", function (event) {
        if (
          event.target.classList.contains("calendar-day") &&
          !event.target.classList.contains("disabled")
        ) {
          const selectedDate = new Date(event.target.dataset.date);
          activeInput.value = event.target.dataset.date;
          if (activeInput === calendarInputs[0]) {
            startDate = selectedDate;
            // Check if the second input's date is before the first input's date
            const endDateInput = calendarInputs[1];
            if (endDateInput.value) {
              const endDate = new Date(endDateInput.value);
              if (endDate <= startDate) {
                endDateInput.value = "";
              }
            }
          }
          document.body.removeChild(calendar);
          activeCalendar = null;
        } else if (
          event.target.classList.contains("prev-month") ||
          event.target.classList.contains("next-month")
        ) {
          const newDate = new Date(
            event.target.dataset.year,
            event.target.dataset.month - 1
          );
          calendar.innerHTML = generateCalendarHTML(newDate);
        }
      });

      document.addEventListener(
        "click",
        function (event) {
          if (!calendar.contains(event.target) && event.target !== input) {
            document.body.removeChild(calendar);
            activeCalendar = null;
          }
        },
        { once: true }
      );
    });
  });

  function generateCalendarHTML(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let calendarHTML = '<div class="calendar-header">';
    calendarHTML += `<button class="prev-month" data-year="${year}" data-month="${month}">&lt;</button>`;
    calendarHTML += `<span>${year}.${String(month + 1).padStart(
      2,
      "0"
    )}</span>`;
    calendarHTML += `<button class="next-month" data-year="${year}" data-month="${
      month + 2
    }">&gt;</button>`;
    calendarHTML += '</div><div class="calendar-body">';

    // Add empty cells for days of the week before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<div class="calendar-day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}.${String(month + 1).padStart(2, "0")}.${String(
        day
      ).padStart(2, "0")}`;
      const dayOfWeek = new Date(year, month, day).getDay();
      const currentDate = new Date(year, month, day);
      let dayClass = "calendar-day";
      if (dayOfWeek === 0) {
        dayClass += " sunday";
      } else if (dayOfWeek === 6) {
        dayClass += " saturday";
      }
      if (
        activeInput === calendarInputs[1] &&
        startDate &&
        currentDate <= startDate
      ) {
        dayClass += " disabled";
      }
      calendarHTML += `<div class="${dayClass}" data-date="${dateStr}">${day}</div>`;
    }

    calendarHTML += "</div>";
    return calendarHTML;
  }

  scrollToTop();
});

function scrollToTop() {
  const topBtnIcon = document.querySelector(".top-btn-icon");
  if (topBtnIcon) {
    topBtnIcon.addEventListener("click", function () {
      const container = document.querySelector("#container");
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  }
}
