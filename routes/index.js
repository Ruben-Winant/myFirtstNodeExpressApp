var express = require("express");
var router = express.Router();
//DATABSE
var pgp = require("pg-promise")(/* options */);
var db = pgp(
  "postgres://admin:Monique1998!!1998@localhost:62338/mymovielistdb"
);

/* GET home page. */
router.get("/", function (req, res, next) {
  db.one("SELECT $1 AS value", 123)
    .then(function (data) {
      console.log("DATA:", data.value);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });

  res.send("index");
  //res.render("index", { title: "Express" });
});

module.exports = router;
