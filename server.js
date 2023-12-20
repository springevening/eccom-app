const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = process.env.PORT || 3002;
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
db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT
  )`);
app.post("/api/ecom/product", (req, res) => {
  const { name, description, price, stock } = req.body;
  db.run(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [name, description, price, stock],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json({ data: { name, description, price, stock } });
      }
    }
  );
});
app.post("/api/ecom/category", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.sendStatus(201);
      }
    }
  );
});
app.get("/api/ecom/product", (req, res) => {
  db.all(`SELECT * FROM products `, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});
app.get("/api/ecom/category", (req, res) => {
  db.all("SELECT * FROM categories", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});
app.get("/api/ecom/category/:id", (req, res) => {
  const categoryId = req.params.id;
  db.get("SELECT * FROM categories WHERE id = ? ", [categoryId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (row) {
        res.json(row); // Found: Send the product details
      } else {
        res.status(404).json({ error: "Product Not Found" });
      }
    }
  });
});
app.get("/api/ecom/product/:id", (req, res) => {
  const productId = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (row) {
        res.json(row); // Found: Send the product details
      } else {
        res.status(404).json({ error: "Product Not Found" });
      }
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
