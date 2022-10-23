const mongoose = require("mongoose");
const Product = require("./product");

const itemEntry = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Product,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  itemList: [itemEntry],
});

cartSchema.methods.addToCart = async function (productId) {
  try {
    const productIndex = this.itemList.findIndex((prod) => {
      console.log(prod.productId);
      return prod.productId._id.toString() === productId.toString();
    });
    if (productIndex >= 0) {
      console.log("Product inccremented to cart");

      this.itemList[productIndex].quantity++;
    } else {
      console.log("Product added from cart");
      this.itemList.push({
        productId: productId,
        quantity: 1,
      });
    }
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};

cartSchema.methods.removeFromCart = async function (productId) {
  try {
    const productIndex = this.itemList.findIndex(
      (prod) => prod.productId._id.toString() === productId.toString()
    );
    if (productIndex >= 0 && this.itemList[productIndex].quantity > 1) {
      console.log("Product decremented from cart");
      this.itemList[productIndex].quantity--;
    } else {
      console.log("Product deleted from cart");
      this.itemList.splice(productIndex, 1);
    }
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
