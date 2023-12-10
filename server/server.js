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

app.post("/api/users", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const newUser = {
    id: 1,
    username,
    password,
  };

  res.status(201).json({ message: "User created successfully", user: newUser });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
