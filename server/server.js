require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5055;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server works");
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
