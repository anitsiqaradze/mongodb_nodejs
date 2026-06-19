// controllers/products.js
var ProductModel = require('../models/product');

module.exports = {

    getAll: async (req, res) => {
        try {
            const products = await ProductModel.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    add: async (req, res) => {
        try {
            const savedItem = await new ProductModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateSpecifications: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(
                req.params.id,
                { specifications: req.body.specifications },
                { new: true, runValidators: true }
            );
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    search: async (req, res) => {
        try {
            const { title, page = 1, size = 10 } = req.query;

            const filter = title
                ? { title: { $regex: title, $options: 'i' } }
                : {};

            const products = await ProductModel.find(filter)
                .skip((page - 1) * size)
                .limit(Number(size));

            const total = await ProductModel.countDocuments(filter);

            res.json({
                data: products,
                page: Number(page),
                size: Number(size),
                total,
                totalPages: Math.ceil(total / size)
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}