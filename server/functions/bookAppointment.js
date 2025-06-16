const fs = require("fs");
const path = require("path");

function bookAppointment(req, res) {
  const filePath = path.join(__dirname, "..", "schedulerData.json");
  const { day, time, firstName, lastName } = req.body;

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // Add Booked Appointment to JSON
    data.bookedAppointments.push({ day, time, firstName, lastName });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.sendStatus(200);
  } catch (error) {
    console.error(`ERROR: ${error}`);

    res.sendStatus(500);
  }
}

module.exports = bookAppointment;
