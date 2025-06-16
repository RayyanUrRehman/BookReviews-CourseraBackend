const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = []; // Stores registered users

// Check if username already exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Check if username and password match
const authenticatedUser = (username, password) => {
  return users.some((user) => user.username === username && user.password === password);
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate inputs
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Authenticate user
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });

  // Save token to session
  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({ message: "User successfully logged in", token: accessToken });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
