const express = require("express");
const { Client } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

const dbConfig = {
  user: process.env.USERNAME, // Replace with your database username
  password: process.env.PASSWORD, // Replace with your database password
  database: process.env.DATABASE, // Replace with your database name
  host:
    process.env.NODE_ENV === "development"
      ? process.env.HOST // use localhost on dev
      : `/cloudsql/${process.env.HOST}`, // Use the Cloud SQL instance connection name on prod
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
  return res.json({
    message: "App test to connect database with cloud run and cloud sql",
    version: "1.0.0",
    author: "aomwara",
  });
});

// Define a route to test the database connection
app.get("/test", async (req, res) => {
  if (client && client._connected) {
    const data = await client.query("SELECT * FROM test");

    return res.json({ status: "connected", test_data: data.rows });
  } else {
    return res.json({ status: "disconnected" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
