const fs = require("fs");
const path = require("path");
const getNextDays = require("./getNextDays.js");

const updateSchedule = () => {
  const filePath = path.join(__dirname, "..", "schedulerData.json");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const schedulerData = JSON.parse(data);
    schedulerData.availableDays = getNextDays(5);

    fs.writeFileSync(filePath, JSON.stringify(schedulerData, null, 2));
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

module.exports = updateSchedule;
