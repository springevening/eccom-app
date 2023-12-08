const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = process.env.PORT || 3000;
//const db = new sqlite3.Database('database.db');
const cors = require("cors");
app.use(cors()); // Add this line before defining routes
app.use(bodyParser.json());

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database opened successfully");
  }
});
db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    price INTEGER,
    stock INTEGER    
  )`);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
