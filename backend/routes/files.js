const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/products/:img", (req, res) => {
  const dir = path.join(__dirname, "../", "\\files\\products\\" + req.params.img);
  // console.log(`${process.env.BASE_BACKEND_URL}\\files\\products\\Untitled1654875659925.png`);
  res.sendFile(dir);
});

module.exports = router;
