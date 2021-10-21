const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    post: { type: String },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userPhotoId: { type: String },
    postImageId: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    isAdmin: { type: Boolean, required: true },
    profession: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);
