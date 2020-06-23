var promise = require("bluebird");

var options = {
  // Initialization Options
  promiseLib: promise,
};

var pgp = require("pg-promise")(options);
var connectionString =
  "postgres://admin:Monique1998!!1998@127.0.0.1:5432/mymovielistdb";
var db = pgp(connectionString);

//TODO hide credentials

// add query functions

module.exports = {
  getSingleMember: getSingleMember,
  getAllMembers: getAllMembers,
  createMember: createMember,
  updateMember: updateMember,
  removeMember: removeMember,
  getSingleMovie: getSingleMovie,
  getAllMovies: getAllMovies,
  createMovie: createMovie,
  updateMovie: updateMovie,
  removeMovie: removeMovie,
  getAllMoviesFromMemberFavorites: getAllMoviesFromMemberFavorites,
  addMovieToMemberFavorites: addMovieToMemberFavorites,
  removeMovieFromMemberFavorites: removeMovieFromMemberFavorites,
};

//#region members

function getSingleMember(req, res, next) {
  var memberId = parseInt(req.params.id);
  db.one("SELECT * FROM member WHERE id = $1", memberId)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieve a single member",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMembers(req, res, next) {
  db.any("SELECT * FROM member")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all members",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createMember(req, res, next) {
  db.none(
    "INSERT INTO member (username, email) VALUES ( ${username}, ${email} )",
    req.body
  )
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Inserted one member",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateMember(req, res, next) {
  db.none("UPDATE member SET username=$1, email=$2 WHERE id = $3", [
    req.body.username,
    req.body.email,
    parseInt(req.params.id),
  ])
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Updated member with id " + req.params.id,
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMember(req, res, next) {
  db.result("DELETE FROM member WHERE id = $1", parseInt(req.params.id))
    .then(function (result) {
      res.status(200).json({
        status: "success",
        message: "removed " + result.rowCount + " member(s)",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion

//#region movies

function getSingleMovie(req, res, next) {
  db.one("SELECT * FROM movie WHERE id = $1", parseInt(req.params.id))
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved movie with id " + req.params.id,
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMovies(req, res, next) {
  db.any("SELECT * FROM movie")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all movies",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createMovie(req, res, next) {
  db.none(
    "INSERT INTO movie (title, imdb) VALUES (${title}, ${imdb})",
    req.body
  )
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Inserted one movie",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateMovie(req, res, next) {
  db.none("UPDATE movie SET title = $1, imdb = $2, WHERE id = $3", [
    req.body.title,
    req.body.imdb,
    parseInt(req.params.id),
  ])
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Updated movie with id " + req.params.id,
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMovie(req, res, next) {
  db.result("DELETE FROM movie WHERE id = $1", parseInt(req.params.id))
    .then(function (result) {
      res.status(200).json({
        status: "success",
        message: "Removed " + result.rowCount + " movie(s)",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion

//#region member_movie

function getAllMoviesFromMemberFavorites(req, res, next) {
  db.any(
    "SELECT * FROM member_movie WHERE member_id = $1",
    parseInt(req.params.id)
  )
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all movies from member with id " + req.params.id,
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addMovieToMemberFavorites(req, res, next) {
  db.none("INSERT INTO member_movie (member_id, movie_imdb) VALUES ($1, $2)", [
    parseInt(req.params.id),
    req.params.imdb,
  ])
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Added a movie to members favorites",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMovieFromMemberFavorites(req, res, next) {
  db.result("DELETE FROM member_movie WHERE movie_imdb = $1", req.params.imdb)
    .then(function (result) {
      res.status(200).json({
        status: "success",
        message:
          "Removed " +
          result.rowCount +
          " movie(s) from member " +
          req.params.id,
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

//#endregion
