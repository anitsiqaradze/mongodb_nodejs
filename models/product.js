// models/products.js
const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    warehouseId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 }
});

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    warehouses: [warehouseSchema],
    specifications: { type: mongoose.Schema.Types.Mixed }
}, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

productSchema.index({ title: 'text' });

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;