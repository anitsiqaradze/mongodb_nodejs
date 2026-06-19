const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: String, required: true },
    path: { type: String, required: true }
}, {
    collection: 'files',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Model = mongoose.model('File', fileSchema);
module.exports = Model;