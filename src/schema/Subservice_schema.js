const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subServiceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    createdAt: { type: Date, default: Date.now }
});

const SubService = mongoose.model('SubService', subServiceSchema);
module.exports = SubService;