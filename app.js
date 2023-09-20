const express = require("express");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL database connection configuration
const connectionString = "<DB_CONNECTION_STRING>";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a route to fetch data from the database
app.get("/data", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM your_table"); // Replace 'your_table' with the name of your PostgreSQL table
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
