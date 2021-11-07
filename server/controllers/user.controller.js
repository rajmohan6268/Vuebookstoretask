const db = require("../models");
const User = db.user;

exports.getUser = async (req, res) => {
  let id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ sucess: false, message: "Not found user with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        sucess: false,
        message: "Error retrieving user with id=" + id,
        err,
      });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userContent = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminContent = (req, res) => {
  res.status(200).send("Admin Content.");
};
