const db = require("../app/db.js");
const Artikel = db.artikel;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.artikel = asyncMiddleware(async (req, res) => {
  await Artikel.create({
    judul: req.body.judul,
    isi: req.body.isi,
    status: req.body.status,
    userId: req.userId
  });

  res.status(201).send({
    status: "Artikel Berhasil Dibuat!"
  });
});

exports.getArtikelAdmin = asyncMiddleware(async (req, res) => {
  const user = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "status", "userId","createdAt"],
    include: [
      {
        model: User,
        attributes: ["nama"]
      }
    ]
  });
  res.status(200).json({
    description: "All Artikel",
    user: user
  });
});


exports.getArtikel = asyncMiddleware(async (req, res) => {
  const user = await Artikel.findAll({where: {
      status : "Aktif"

    },
    attributes: ["id", "judul", "isi", "status", "userId","createdAt"],
    include: [
      {
        model: User,
        attributes: ["nama"]
      }
    ]
  });
  res.status(200).json({
    description: "All Artikel",
    user: user
  });
});

exports.getArtikelByLogin = asyncMiddleware(async (req, res) => {
  const user = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "status", "userId"],where: {
      userId : req.userId
    },
    include: [
      {
        model: User,
        attributes: ["nama"]
      }
    ]
  });
  res.status(200).json({
    description: "All Artikels",
    user: user
  });
});


exports.getArtikelById = asyncMiddleware(async (req, res) => {
  const user = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "status", "userId","createdAt"],where: {
      id : req.params.id
    },

    include: [
      {
        model: User,
        attributes: ["nama"]
      }
    ]
  });
  res.status(200).json({
    description: "All Artikel",
    user: user
  });
});


exports.blockArtikel = asyncMiddleware(async (req, res) => {
  const idartikel = req.params.id;
  const user = await Artikel.update(
    {
      status : req.body.status
    },  
    {
      where: {
        id: idartikel
      }
    }
  ).then(user =>
    res.json({
      error: false,
      message: "Status Artikel Diubah!"
    })
  )
  .catch(error =>
    res.json({
      error: true,
      error: error
    })
  );
});

