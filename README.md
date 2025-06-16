# CMBDev

**CMBDev** is a minimalist, responsive portfolio website designed to showcase the full-stack web development services of Carson M. Boches. Tailored for small businesses, the site highlights clean design, reliability, and functionality.

---

## Features

- **Modern, Responsive Layout**  
  Built with clean HTML, CSS, and JavaScript for a seamless experience across devices.
  
- **Navigation Menu**  
  Includes links to the following pages:
  - `.home`
  - `.services`
  - `.scheduleAppointment`
  - `.aboutMe`

---

## Features of the Appointment Scheduling Page

- **Time Slot Selection**  
  Users can select a preferred time slot from a list of available times.

- **Form Validation**  
  The form ensures that all necessary fields are completed before submission.

- **Appointment Confirmation**  
  Once the user submits their appointment request, a React component renders a confirmation message that details the name and selected time of the user.

- **Prevention of Double-Booking**  
  After an appointment is confirmed, the selected time slot becomes **unselectable** on subsequent visits to the scheduling page.

---

## Tech Stack

- **HTML5**: Structured and semantic markup for user accessibility.
- **CSS3**: Responsive styling for fluid layouts across all devices.
- **JavaScript**: Functional logic for appointment scheduling and DOM manipulation.
- **React**: Dynamic component displaying appointment confirmation message.
- **Express**: Backend server framework used to handle the routing of the app and serve static files.
  
    - The **server** serves the static files from the `public` directory, displays the main `index.html` page, and handles interactions with the appointment scheduler.

---

## How to Run the Project Locally

After downloading or cloning this project, run the following command in the project directory to install all required dependencies:
```bash
npm install
```

In the project directory, run:

```bash
cd server
node server.js
```

This runs the app in the development mode.
Open [http://localhost:3000] to view it in your browser.
