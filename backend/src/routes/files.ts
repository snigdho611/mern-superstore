import express from "express";
const router = express.Router();
import path from "path";


// getImage
router.get("/products/:img", (req, res) => {
  console.log(path.join(__dirname, "../../files/" + req.params.img));
  try {
    const dir = path.join(__dirname, "../../files/products/" + req.params.img);
    res.sendFile(dir);
  } catch (error) {
    console.log(error);
  }
});

export default router;
