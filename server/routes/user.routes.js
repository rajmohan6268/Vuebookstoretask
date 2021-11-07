module.exports = (app) => {
  const { authJwt } = require("../middlewares");
  const usercontroller = require("../controllers/user.controller");
  const router = require("express").Router();
  const bookcontroller = require("../controllers/store.controller");

  router.get(
    "/:id",

    usercontroller.getUser
  );
  //router.get("/", [authJwt.verifyToken], controller.userBoard);

  router
  .delete("/admin/books/deletebook/:id", bookcontroller.deletebook)
  .post("/admin/books/increasequantity/:id", bookcontroller.increaseQuantity)
   .post("/admin/books/decreasequantity/:id", bookcontroller.decreaseuantity);

  router.post(
    "/admin/addbooks",
    // [authJwt.verifyToken, authJwt.isAdmin],
    bookcontroller.addbooks
  );

  app.use("/api/users", router);
};
