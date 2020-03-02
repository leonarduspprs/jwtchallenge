const db = require("../app/db.js");
const Artikel = db.artikel;
const asyncMiddleware = require("express-async-handler");


exports.artikel = asyncMiddleware(async (req, res) => {
    await Artikel.create({
      judul: req.body.judul,
      isi: req.body.isi,
      status: req.body.status,
      userId : req.userId
    });
  
    res.status(201).send({
      status: "Artikel Berhasil Dibuat!"
    });
  });

  exports.getArtikel = asyncMiddleware(async (req, res) => {
    const user = await Artikel.findAll({
      attributes: ["id", "judul", "isi", "status"]
    });
    res.status(200).json({
      description: "All User",
      user: user
    });
  });