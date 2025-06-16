const URL = "http://localhost:3000/schedulerData";

document.addEventListener("DOMContentLoaded", () => {
  // Fetch Scheduler Data
  if (window.location.pathname === "/pages/scheduler.html") {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => handleData(data))
      .catch((error) => console.error(`ERROR: ${error}`));
  }

  // Handle On-Click Functionality
  function addTimeCardListener(availableTime, day, time) {
    availableTime.addEventListener("click", () => {
      const selected = document.querySelector(".time-card.selected");
      if (selected) selected.classList.remove("selected");

      availableTime.classList.add("selected");
      document.getElementById(
        "selected-appointment"
      ).textContent = `${day} @ ${time}`;
    });
  }

  // Handle Scheduler Data Rendering
  function handleData(data) {
    const alreadyBooked = data.bookedAppointments;

    data.availableDays.forEach((day) => {
      // Render Day Container
      const availableDay = document.createElement("div");
      availableDay.classList.add("full-card");

      // Render Day Label
      const dayText = document.createElement("div");
      dayText.classList.add("day-card");
      dayText.textContent = day;
      availableDay.appendChild(dayText);

      // Render Time Data
      const availableTimes = document.createElement("ul");
      data.availableTimes.forEach((time) => {
        const availableTime = document.createElement("li");
        availableTime.textContent = time;
        availableTime.classList.add("time-card");
        availableTime.setAttribute("day-data", day);
        availableTimes.appendChild(availableTime);

        // Format Already Booked Times
        const isBooked = alreadyBooked.some((appt) => {
          return appt.day === day && appt.time === time;
        });

        if (isBooked) {
          availableTime.classList.add("unavailable-time");
          return;
        }

        // Add On-Click Functionality
        addTimeCardListener(availableTime, day, time);
      });

      availableDay.appendChild(availableTimes);
      document.getElementById("scheduler").appendChild(availableDay);
    });
  }

  // Handle Form Submission (Success)
  function makeUnavailable(selectedAppointment, firstName, lastName) {
    const appointmentText = selectedAppointment.textContent.trim();
    const [day, time] = appointmentText.split(" @ ");

    const appointmentData = {
      day: day.trim(),
      time: time.trim(),
      firstName: firstName,
      lastName: lastName,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then(() => {
        // Hide Scheduler
        const schedulerBody = document.getElementById("scheduler-body");
        schedulerBody.classList.add("hidden");

        // Render Appointment Confirmation
        const apptConfirmation = document.getElementById("appt-confirmation");

        ReactDOM.render(
          React.createElement(window.ApptConfirmation, {
            firstName: firstName,
            appointmentText: `${day} at ${time}`,
          }),
          apptConfirmation
        );

        apptConfirmation.classList.add("show");
      })
      .catch((error) => console.error(`ERROR: ${error}`));
  }

  const form = document.getElementById("scheduler-form");
  // Handle Form Submission (Validation)
  form.addEventListener("submit", (event) => {
    const selectedAppointment = document.getElementById("selected-appointment");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const phoneNumber = document.getElementById("phone-number");
    const formFeedback = document.getElementById("form-feedback");

    // RegEx
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    event.preventDefault();

    const appointmentText = selectedAppointment.textContent.trim();
    if (appointmentText === "No Time Selected") {
      selectedAppointment.classList.add("form-error");
      formFeedback.textContent = "Please select appointment time.";
      return;
    }

    if (firstName.value.trim().length < 2) {
      formFeedback.textContent =
        "Error: First name must contain two (2) or more characters.";
      firstName.classList.add("form-error");
      return;
    }

    if (!nameRegex.test(firstName.value.trim())) {
      formFeedback.textContent =
        "Error: First name must contain alphabetic characters only.";
      firstName.classList.add("form-error");
      return;
    }

    if (lastName.value.trim().length < 2) {
      formFeedback.textContent =
        "Error: Last name must contain two (2) or more characters.";
      lastName.classList.add("form-error");
      return;
    }

    if (!nameRegex.test(lastName.value.trim())) {
      formFeedback.textContent =
        "Error: Last name must contain alphabetic characters only.";
      lastName.classList.add("form-error");
      return;
    }

    if (!phoneRegex.test(phoneNumber.value.trim())) {
      formFeedback.textContent =
        "Error: Phone number must be formatted (e.g., 123-456-7890).";
      phoneNumber.classList.add("form-error");
      return;
    }

    makeUnavailable(
      selectedAppointment,
      firstName.value.trim(),
      lastName.value.trim()
    );
  });
});
