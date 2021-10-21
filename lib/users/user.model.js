const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, default: Date.now },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    gender: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    photoId: { type: String },
    profession: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
