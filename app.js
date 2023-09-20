const express = require("express");
const { Client } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

const dbConfig = {
  user: process.env.USER, // Replace with your database username
  password: process.env.PASSWORD, // Replace with your database password
  database: process.env.DB, // Replace with your database name
  host: `/cloudsql/${process.env.HOST}`, // Use the Cloud SQL instance connection name
};

const client = new Client(dbConfig);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
    // Optionally, you can take additional actions here, such as logging or notifying administrators.
  }
}

// Attempt to connect to the database
connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "App test to connect database with cloud run and cloud sql",
    version: "1.0.0",
    author: "aomwara",
  });
});

// Define a route to test the database connection
app.get("/test", (req, res) => {
  if (client && client._connected) {
    res.json({ status: "connected" });
  } else {
    res.json({ status: "disconnected" });
  }
});

//try to hard connect db
app.get("/connect", async (req, res) => {
  try {
    await client.connect();
    res.json({ status: "connected" });
  } catch (error) {
    res.json({ status: "disconnected", error: error });
  }
});

// try to hard disconnect db
app.get("/disconnect", async (req, res) => {
  try {
    await client.end();
    res.json({ status: "disconnected" });
  } catch (error) {
    res.json({ status: "connected", error: error });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
