const express = require("express");
const { Client } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

// PostgreSQL database connection configuration
const connectionString = process.env.PG_CONNECTION_STRING;
const client = new Client({
  connectionString: connectionString,
});

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
    res.json({ status: "connected", author: "aomwara" });
  } else {
    res.json({ status: "disconnected", author: "aomwara" });
  }
});

app.get("/env", (req, res) => {
  res.json({
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
  });
});

//connect db
app.get("/connect", async (req, res) => {
  try {
    await client.connect();
    res.json({ status: "connected", author: "aomwara" });
  } catch (error) {
    res.json({ status: "disconnected", author: "aomwara", error: error });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
