const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const artikelController = require("../controller/artikelController.js");
const komentarController = require("../controller/komentarController.js");

module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);

  app.get("/user", [authJwt.verifyToken], userController.getUser);

  app.get(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.getUserById
  );

  app.put(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.blockUser
  );

  //Manage Article
  app.post("/artikel", [authJwt.verifyToken], artikelController.artikel);

  app.get("/artikel", artikelController.getArtikel);

  app.get(
    "/artikelonadmin",
    [authJwt.verifyToken],
    artikelController.getArtikelAdmin
  );

  app.put(
    "/artikel/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.blockArtikel
  );

  app.get(
    "/artikell/",
    [authJwt.verifyToken],
    artikelController.getArtikelByLogin
  );

  app.get("/artikelbyid/:id", artikelController.getArtikelById);

  //endpoint komentar

  app.post(
    "/komentar/:id",
    [authJwt.verifyToken],
    komentarController.tambahKomentar
  );

  app.get("/komentar/:id", komentarController.getKomentarByArtikel);

  app.put(
    "/komentar/:id",
    [authJwt.verifyToken],
    komentarController.blockKomentar
  );

  app.delete(
    "/komentar/:id",
    [authJwt.verifyToken],
    komentarController.deleteKomentar
  );

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
