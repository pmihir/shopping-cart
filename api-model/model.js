var mongoose = require("mongoose");
const { Schema } = require("mongoose");

const newProductSchema = new mongoose.Schema(
    {
        category: String,
        subcategory: String,
        name: String,
        discountPrice: Number,
        price: Number,
        image: String,
        brand: String,
        productId: String,
        color: {
            color: String,
            image: String,
            price: Number
        }
    }
);

module.exports = mongoose.model('Product', newProductSchema);