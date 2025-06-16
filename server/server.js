const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const updateSchedule = require("./functions/updateSchedule.js");
const bookAppointment = require("./functions/bookAppointment.js");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

// Update Scheduler Data
updateSchedule();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/schedulerData", (req, res) => {
  res.sendFile(path.join(__dirname, "schedulerData.json"));
});

app.post("/schedulerData", bookAppointment);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
