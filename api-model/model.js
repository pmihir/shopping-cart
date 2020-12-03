var mongoose = require("mongoose");
const { Schema } = require("mongoose");

const newProductSchema = new mongoose.Schema(
    {
        category: String,
        name: String,
        netPrice: Number,
        price: Number,
        image: String,
        brand: String,
        discount: Number,
        description: String
    }
);

module.exports = mongoose.model('Product', newProductSchema);