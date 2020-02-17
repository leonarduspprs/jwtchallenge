const db = require("../app/db.js");
const User = db.user;
const Book = db.book;

const asyncMiddleware = require("express-async-handler");

exports.addOrder = asyncMiddleware(async (req, res) => {
  // Save order to Database
  const user = await User.findOne({
    where: { id: req.body.userId }
  });
  const books = await Book.findOne({
    where: { id: req.body.bookId }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "Orders successfull"
  });
});

exports.orders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });

  res.status(200).json({
    description: "All Order",
    user: user
  });
});

exports.getOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  console.log("error");
  res.status(200).json({
    description: "User order page",
    user: user
  });
});
