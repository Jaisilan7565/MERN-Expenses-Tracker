const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routers/categoryRouter");
const transactionRouter = require("./routers/transactionRouter");

const app = express();
const PORT = process.env.PORT || 8000;

//DB Connection ("%40" is user for @) inside Password
mongoose
  .connect(
    "mongodb+srv://doremon:Doremon%401432@expense-tracker.kound8h.mongodb.net/MERN-Expenses?retryWrites=true&w=majority&appName=expense-tracker"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

//To Parse JSON data
app.use(express.json());

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//Error ----> always use error handling middleware in the last after Routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
