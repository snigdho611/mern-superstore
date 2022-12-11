import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import databaseConnection from "./config/database";

import adminRouter from "./routes/admin";
import authenticateRouter from "./routes/authenticate";
import cartRouter from "./routes/cart";
import imagesRouter from "./routes/file";
import productRouter from "./routes/product";
import salesRouter from "./routes/sales";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/files", imagesRouter);
app.use("/auth", authenticateRouter);
app.use("/sales", salesRouter);

databaseConnection((): any => {
  app.listen(8000, () => {
    console.log("Application is running on 8000");
  });
});
