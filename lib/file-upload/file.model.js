const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fileName: { type: String, require: true },
    contentType: { type: String, require: true },
    image: { type: Buffer, require: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('File', schema);
