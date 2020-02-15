const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.addBook = asyncMiddleware(async (req, res) => {
  await Book.create({
    title: req.body.title,
    author: req.body.author,
    page: req.body.page,
    publisher_date: req.body.publisher_date,
    language: req.body.language,
    publisher_id: req.body.publisher_id
  });
  console.log("Input Error");
  res.status(210).send({
    status: "Buku Berhasil diinput"
  });
});

exports.getBook = asyncMiddleware(async (req, res) => {
  const books = await Book.findAll({
    attributes: [
      "id",
      "title",
      "author",
      "publisher_date",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Showing all book",
    book: books
  });
});

exports.getBookById = asyncMiddleware(async (req, res) => {
  const books = await Book.findOne({
    where: { id: req.params.id },
    attributes: [
      "title",
      "author",
      "publisher_date",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Showing all book",
    book: books
  });
});
