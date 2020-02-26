var express = require("express");
var app = express();
var cors = require("cors");
var morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

require("./router/router.js")(app);

// const db = require('./app/db.js');
// const Role = db.role;

// // force: true will drop the table if it already exists (comment this part aft
//     first run, to disable migration)

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force: true }');
//     initial();
//     });

var server = app.listen(8080, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

// function initial() {

//     Role.create({
//     id: 1,
//     name: "USER"
//     });

// Role.create({
//     id: 2,
//     name: "ADMIN"
//     });

// Role.create({
//     id: 3,
//     name: "PM"
//     });
// }
