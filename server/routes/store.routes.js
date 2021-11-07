module.exports = (app) => {
 // const { authJwt } = require("../middlewares");
  const controller = require("../controllers/store.controller");
  const router = require("express").Router();

  router.get("/getBooks", controller.getbooks);
  app.use("/api/store", router);
};
