const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routers/categoryRouter");
const transactionRouter = require("./routers/transactionRouter");

// Cors is used for trusted frontend issues
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

//DB Connection ("%40" is user for @) inside Password
mongoose
  .connect(process.env.MongoDB_Connection_String)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// cors config
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

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
