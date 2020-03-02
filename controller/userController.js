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

exports.blockUser = asyncMiddleware(async (req, res) => {
  const iduser = req.params.id;
  const statusblocked = "Blocked"
  const user = await User.update(
    {
      status : statusblocked
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


// exports.adminBoard = asyncMiddleware(async (req, res) => {
//   const user = await User.findOne({
//     where: { id: req.userId },

//     attributes: ["name", "username", "email"],
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name"],
//         through: {
//           attributes: ["userId", "roleId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "Admin Board",
//     user: user
//   });
// });
// exports.managementBoard = asyncMiddleware(async (req, res) => {
//   const user = await User.findOne({
//     where: { id: req.userId },
//     attributes: ["name", "username", "email"],
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name"],
//         through: {
//           attributes: ["userId", "roleId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "Management Board",
//     user: user
//   });
// });
