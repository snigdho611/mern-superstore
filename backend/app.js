const express = require("express");
const productRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
const authenticateRouter = require("./routes/authenticate");
// const shopRouter = require("./routes/shop");
const { failure } = require("./utils/commonResponse");
const HTTP_STATUS = require("./utils/httpStatus");
const dotenv = require("dotenv");
const databaseConnection = require("./config/database");
const cors = require("cors");
// const User = require("./models/user");

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/", authenticateRouter);

databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Application is running on 8000");
  });
});
