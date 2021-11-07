const db = require("../models");
const Book = db.book;

exports.getbooks = async (req, res) => {
  const id = req.params.id;

  Book.find({})
    .sort({ createdAt: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ sucess: false, message: "no books found" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        sucess: false,
        message: "Error retrieving Book with id=" + id,
        err,
      });
    });
};

exports.addbooks = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    image: req.body.image || "https://i.imgur.com/ruzceQa.png",
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  book
    .save(book)
    .then((data) => {
      res.status(201).json({
        sucess: true,
        status: "ok",
        id: data._id,
        message: "book added sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        sucess: false,

        message: err.message || "Some error occurred while adding the book.",
      });
    });
};

exports.deletebook = async (req, res) => {
  try {
    console.log(req.params);
    let _Book = await Book.findOne({ _id: req.params.id });

    if (!_Book) {
      return res.status(404).send({
        sucess: false,
        message: "Book not found with id " + req.params.id,
      });
    } else {
      Book.deleteOne({ _id: req.params.id })
        .then(async () => {
          res.status(200).json({
            sucess: true,
            status: "ok",
            message: "book sucessfuly deleted removed",
          });
        })
        .catch((err) => {
          res.status(500).send({
            sucess: false,
            message: err.message || "Some error occurred while removing book.",
          });
        });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message: e.message || "Some error occurred while deleting the book.",
    });
  }
};
exports.increaseQuantity = async (req, res) => {
  console.log(req.params, req.body);

  try {
    let _Book = await Book.findOne({ _id: req.params.id });
    if (!_Book) {
      return res.status(404).send({
        sucess: false,
        message: "Book not found with id " + req.params.id,
      });
    } else {
      _Book.quantity = _Book.quantity + 1;
      _Book
        .save()
        .then(async () => {
          res.status(200).json({
            sucess: false,
            message: "book quanty increased",
          });
        })
        .catch((err) => {
          res.status(500).send({
            sucess: false,
            message: err.message || "Some error occurred while removing book.",
          });
        });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message:
        e.message || "Some error occurred while increasing  the book quantity.",
    });
  }
};

exports.decreaseuantity = async (req, res) => {
  console.log(req.params, req.body);

  try {
    let _Book = await Book.findOne({ _id: req.params.id });
    if (!_Book) {
      return res.status(404).send({
        sucess: false,
        message: "Book not found with id " + req.params.id,
      });
    } else {
      _Book.quantity = _Book.quantity - 1;
      _Book
        .save()
        .then(async () => {
          res.status(200).json({
            sucess: false,
            message: "book quanty decreased",
          });
        })
        .catch((err) => {
          res.status(500).send({
            sucess: false,
            message:
              err.message ||
              "Some error occurred while decreasing  book quantity.",
          });
        });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message:
        e.message || "Some error occurred while decreasing  book quantity.",
    });
  }
};

exports.quantity = async (req, res) => {
  console.log(req.params, req.body, req.query, req.query.role);
  let role = req.query.role || req.body.role;

  const intent = req.query.intent;
  console.log(typeof intent, "type");
  try {
    const _Book = await Book.findOne({ _id: req.params.id });

    if (!_Book) {
      return res.status(404).send({
        sucess: false,
        message: "Book not found with id " + req.params.id,
      });
    } else {
      if (intent === "inc") {
        _Book.quantity = _Book.quantity + 1;
      }
      if (intent === "dec") {
        _Book.quantity = _Book.quantity - 1;
      }

      _Book
        .save()
        .then(async () => {
          res.status(200).json({
            sucess: false,
            message: `book quantity sucessfully ${intent === "inc"?'decreasing':'decreasing'} `,
          });
        })
        .catch((err) => {
          res.status(500).send({
            sucess: false,
            message:
              err.message ||
              `Some error occurred while ${intent === "inc"?'decreasing':'decreasing'}  book quantity.`,
          });
        });
    }
  } catch (e) {
    res.status(500).json({
      sucess: false,
      message:
        e.message || `Some error occurred while ${intent === "inc"?'decreasing':'decreasing'}  book quantity.`,
    });
  }
};
