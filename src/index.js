/*
Task name: User endpoints

Requirements
  1.  We need to create CRUD endpoints
  2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
  3.  Each user should have the following data entries: 
        id, name, zip code, latitude, longitude, timezone
  4.  When creating a user, allow input for name and zip code.  
      (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current) 
  5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
  6.  Connect to a ReactJS front-end
  * feel free to add add something creative you'd like

  API Key: 7afa46f2e91768e7eeeb9001ce40de19
*/

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   console.log('triggering  "/" endpoint...');

//   // define company name
//   let companyName = "RentRedi";
//   console.log("companyName = ", companyName);

//   // send response
//   res.send(`Welcome to the ${companyName} interview!`);
// });

// app.listen(8080);
require("dotenv").config(); // make sure it's the first line in index.js

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the RentRedi interview!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});