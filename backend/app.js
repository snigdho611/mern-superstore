const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./routes/products");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(productRouter);
app.listen(5000, () => {
  console.log("Server started, port: 5000");
});
