const express = require("express");
const transactionRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const transactionController = require("../controllers/transactionCtrl");

//Add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);

//Lists
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

//Update
transactionRouter.put(
  "/api/v1/transactions/update/:id",
  isAuthenticated,
  transactionController.update
);

//Delete
transactionRouter.delete(
  "/api/v1/transactions/delete/:id",
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;
