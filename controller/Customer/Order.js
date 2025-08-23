const Cart = require('../../models/Cart.models.js');
const Product = require('../../models/items.models.js');

const addToCart = async (req, res) => {
  try {
    const {
      userdetails,
      Quantity,
      status,
      productName,
      Productitems,
      Price,
      Productid,
      totoalprice,
      productname,
      location,
    } = req.body;
    const userId = req.user?.id;
    const items = req.body.items;

    // if (Quantity <= 0 || !Productid || !Quantity || items.length == 0) {
    //   return res.status(404).json({ message: "fill all fields" });
    // }

    const newCart = new Cart({
      userdetails: userId,
      Productitems: [],
      totoalprice: 0,
      status: 'pending',
      location,
    });

    for (const { productId, quantity } of items) {
      if (!productId || !quantity) {
        return res.status(404).json({ message: 'no product id or quantity' });
      }

      const products = await Product.findById(productId);
      if (!products) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (products.stock < quantity) {
        return res.status(404).json({ message: 'Out of stock' });
      }
      products.stock -= quantity;
      await products.save();

      const priceperitems = products.Price * quantity;

      const existingIndex = newCart.Productitems.findIndex(
        (item) => item.productdetails.toString() === products._id.toString(),
      );

      if (existingIndex >= 0) {
        let currentItem = newCart.Productitems[existingIndex];

        currentItem.Quantity = currentItem.Quantity + quantity;
        currentItem.Price = currentItem.Quantity * products.Price;
        currentItem.productname = products.productName;
      } else {
        newCart.Productitems.push({
          productdetails: products._id,
          Productid: products.productId,
          productname: products.productName,
          Quantity: quantity,
          Price: priceperitems,
        });
      }
    }

    let total = 0;
    for (const item of newCart.Productitems) {
      total += item.Price;
    }
    newCart.totoalprice = total;

    await newCart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: newCart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal Server Error dsd' });
  }
};

const viewTocart = async (req, res) => {
  try {
    const viewcart = await Cart.find({ userdetails: req?.user?._id });

    if (viewcart.length === 0) {
      return res.status(400).json({ message: 'no any order' });
    }

    res.status(200).json({ data: viewcart });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { addToCart, viewTocart };
