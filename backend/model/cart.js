const mongoose = require("mongoose");
const Product = require("./product");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  itemList: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

cartSchema.methods.addToCart = async function (prodId) {
  try {
    const productIndex = this.products.findIndex(
      (prod) => prod.product.toString() === prodId.toString()
    );
    if (productIndex >= 0) {
      this.products[productIndex].quantity++;
    } else {
      this.products.push({
        product: prodId,
        quantity: 1,
      });
    }
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};

cartSchema.methods.removeFromCart = async function (prodId) {
  try {
    this.products = this.products.filter((prod) => prod.product.toString() !== prodId.toString());
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
