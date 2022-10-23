const express = require("express");
const router = express.Router();
const path = require("path");

// getImage
router.get("/products/:img", (req, res) => {
  try {
    const dir = path.join(__dirname, "../", "\\files\\products\\" + req.params.img);
    res.sendFile(dir);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
