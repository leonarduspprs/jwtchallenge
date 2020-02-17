const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const bookController = require("../controller/bookController.js");
const orderController = require("../controller/orderController.js");

module.exports = function(app) {
  // Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  // get 1 user according to roles
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);

  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  //controller buku

  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.addBook
  );

  app.get(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.getBook
  );

  app.get(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.getBookById
  );

  app.post(
    "/orders",
    [authJwt.verifyToken, authJwt.isAdmin],
    orderController.addOrder
  );

  app.get(
    "/orders",
    [authJwt.verifyToken, authJwt.isAdmin],
    orderController.orders
  );

  app.get(
    "/orders/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    orderController.getOrder
  );

  // error handler 404

  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
