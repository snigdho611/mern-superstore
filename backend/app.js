const express = require("express");
const productRouter = require("./routes/products");
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

databaseConnection(() => {
  User.find()
    .then((user) => {
      if (!user.length) {
        const newUser = new User({ name: "Mominul", email: "mominul@gmail.com" });
        newUser
          .save()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  app.listen(8000, () => {
    console.log("Application is running on 8000");
  });
});
