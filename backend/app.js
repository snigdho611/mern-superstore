const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnection = require("./config/database");
const path = require("path");
const productRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
const authenticateRouter = require("./routes/authenticate");
const cartRouter = require("./routes/cart");
const imagesRouter = require("./routes/files");

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

// console.log(dir);

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/files", imagesRouter);
app.use("/", authenticateRouter);

databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Application is running on 8000");
  });
});
