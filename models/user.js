const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: {type: Boolean},
    permits: [{ type: String }]
}, {
    collection: 'users',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;