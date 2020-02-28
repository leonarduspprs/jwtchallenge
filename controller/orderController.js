const db = require("../app/db.js");
const User = db.user;
const Book = db.book;

const asyncMiddleware = require("express-async-handler");

exports.addOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.body.bookId }
  });
  await user.addBooks(books);
  res.status(201).send({
    status: "Order registered successfully!"
  });
});

exports.orders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"],
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

exports.orderById = asyncMiddleware(async (req, res) => {
  const user = await User.findAll(
    {
      where: { id: req.params.id }
    },
    {
      attributes: ["id", "name", "username", "email"],
      include: [
        {
          model: Book,
          attributes: ["title", "author", "pages", "language", "publisher_id"],
          through: {
            attributes: ["userId", "bookId"]
          }
        }
      ]
    }
  );
  res.status(200).json({
    description: "All Order",
    user: user
  });
});
