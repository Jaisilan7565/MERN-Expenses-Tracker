const express = require("express");
const categoryRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");

//Add
categoryRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryController.create
);

//Lists
categoryRouter.get(
  "/api/v1/categories/lists",
  isAuthenticated,
  categoryController.lists
);

//Update
categoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuthenticated,
  categoryController.update
);

//Delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoryRouter;
