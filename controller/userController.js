const db = require("../app/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");
exports.getUser = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "nama", "username", "email","admin","status"]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.getUserById = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({ where: { id : req.params.id}},{
    attributes: ["id", "nama", "username", "email","admin","status"]
  });

  res.status(200).json({
    description: "All User",
    user: user
  });
});


exports.blockUser = asyncMiddleware(async (req, res) => {
  const iduser = req.params.id;
  const user = await User.update(
    {
      status : req.body.status
    },  
    {
      where: {
        id: iduser
      }
    }
  ).then(user =>
    res.json({
      error: false,
      message: "User diblokir"
    })
  )
  .catch(error =>
    res.json({
      error: true,
      error: error
    })
  );
});

