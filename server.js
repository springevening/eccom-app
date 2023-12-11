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

db.run(`CREATE TABLE IF NOT EXISTS categorys (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT
  )`);
app.post("/api/product", (req, res) => {
  const { name, description, price, stock } = req.body;
  db.run(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [name, description, price, stock],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200);
      }
    }
  );
});
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/category", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO categorys (name, description) VALUES (?, ?)",
    [name, description],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200);
      }
    }
  );
});
app.get("/api/categorys", (req, res) => {
  db.all("SELECT * FROM categorys", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
