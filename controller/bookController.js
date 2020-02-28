const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.addBook = asyncMiddleware(async (req, res) => {
  await Book.create({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
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

exports.deleteBook = asyncMiddleware(async (req, res) => {
  const books = await Book.destroy({
    where: { id: req.params.id }
  })
    .then(status =>
      res.json({
        error: false,
        message: "Books has been delete."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        error: error
      })
    );
});

exports.updateBuku = asyncMiddleware(async (req, res) => {
  const idbuku = req.params.id;
  const {
    title,
    author,
    publish_date,
    pages,
    language,
    publisher_id
  } = req.body;
  const book = await Book.update(
    {
      title: title,
      author: author,
      publish_date: publish_date,
      pages: pages,
      language: language,
      publisher_id: publisher_id
    },
    {
      where: {
        id: idbuku
      }
    }
  ).then(books =>
    res.json({
      error: false,
      message: "Data Buku Telah Diupdate"
    })
  )
  .catch(error =>
    res.json({
      error: true,
      error: error
    })
  );
});
