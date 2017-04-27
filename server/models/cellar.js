console.log("models: product.js")
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var CellarSchema = new mongoose.Schema({
 cellarName: {type: String, required: true, minlength: 4},
 cellarItems: [{type: Schema.Types.ObjectId, ref: 'CellarItem'}]
}, { timestamps: true });

mongoose.model('Cellar', CellarSchema);
//var Cellar = mongoose.model('Cellar');
