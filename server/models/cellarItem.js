console.log("models: product.js")
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var CellarItemSchema = new mongoose.Schema({
    quantity: {type: Number, required: true},
    price: {type: Number, required: false}, 
    purchaseDate: {type: Date, required: false}, 
    purchaseLocation: {type: String, required: false},
    wine: {type: Schema.Types.ObjectId, ref: 'Wine', required: true},
    storageLocationId: { type: Number, required: true }
}, { timestamps: true });

mongoose.model('CellarItem', CellarItemSchema);

