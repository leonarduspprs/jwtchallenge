const db = require("../app/db.js");
const User = db.user;
const Komentar = db.komentar;
const asyncMiddleware = require("express-async-handler");

exports.tambahKomentar = asyncMiddleware(async (req, res) => {
  await Komentar.create({
    isikomentar: req.body.isikomentar,
    status: req.body.status,
    userId: req.userId,
    artikelId: req.params.id
  });

  res.status(201).send({
    status: "Komentar Berhasil Dibuat!"
  });
});

exports.getKomentarByArtikel = asyncMiddleware(async (req, res) => {
  const user = await Komentar.findAll({
    attributes: ["id", "isikomentar", "status", "artikelId", "userId"],
    where: {
      artikelId: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ["nama"]
      }
    ]
  }); 
  res.status(200).json({
    description: "All Komentar",
    user: user
  });
});

exports.deleteKomentar = asyncMiddleware(async (req, res) => {
  const komentar = await Komentar.destroy({
    where: { id: req.params.id }
  })
    .then(status =>
      res.json({
        error: false,
        message: "Komenatar has been deleted."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        error: error
      })
    );

  console.log("lewatsinibang");
});

exports.blockKomentar = asyncMiddleware(async (req, res) => {
  const idkomentar = req.params.id;
  await Komentar.update(
    {
      status : req.body.status
    },  
    {
      where: {
        id: idkomentar
      }
    }
  ).then(user =>
    res.json({
      error: false,
      message: "Status Komentar Diubah!"
    })
  )
  .catch(error =>
    res.json({
      error: true,
      error: error
    })
  );
});



