module.exports = (app) => {
  const { authJwt } = require("../middlewares");
  const usercontroller = require("../controllers/user.controller");
  const router = require("express").Router();
  const bookcontroller = require("../controllers/store.controller");

  router.get("/:id",usercontroller.getUser );


  router.post("/books/quantity/:id",[authJwt.verifyToken, authJwt.isAdmin],  bookcontroller.quantity);

  router.delete("/admin/books/deletebook/:id", bookcontroller.deletebook);

  router.post(
    "/admin/addbooks",
    // [authJwt.verifyToken, authJwt.isAdmin],
    bookcontroller.addbooks
  );

  app.use("/api/users", router);
};
