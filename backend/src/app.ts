import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/database";
import productRouter from "./routes/product";

import adminRouter from "./routes/admin";
import authenticateRouter from "./routes/authenticate";
import cartRouter from "./routes/cart";
import imagesRouter from "./routes/file";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/files", imagesRouter);
app.use("/auth", authenticateRouter);

databaseConnection((): any => {
  app.listen(8000, () => {
    console.log("Application is running on 8000");
  });
});
