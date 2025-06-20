const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

const axios = require('axios');

axios.get('http://localhost:5000/')
  .then(response => {
    console.log("Books list using Promises:\n", response.data);
  })
  .catch(error => {
    console.error("Error fetching books:", error.message);
  });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


const isbn = '5'; 

axios.get(`http://localhost:5000/isbn/${isbn}`)
  .then(response => {
    console.log("Book Details (Promises):\n", response.data);
  })
  .catch(error => {
    console.error("Error fetching book by ISBN:", error.message);
  });


  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];

  for (let key in books) {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push(books[key]);
    }
  }

  if (booksByAuthor.length > 0) {
    return res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});


const author = 'Jane Austen'; 

axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`)
  .then(response => {
    console.log("Books by Author (Promises):\n", response.data);
  })
  .catch(error => {
    console.error("Error fetching books by author:", error.message);
  });


public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];

  for (let key in books) {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      booksByTitle.push(books[key]);
    }
  }

  if (booksByTitle.length > 0) {
    return res.status(200).send(JSON.stringify(booksByTitle, null, 4));
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});


const title = 'Things Fall Apart'; 

axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
  .then(response => {
    console.log("Books with title (Promises):\n", response.data);
  })
  .catch(error => {
    console.error("Error fetching books by title:", error.message);
  });



public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


module.exports.general = public_users;
