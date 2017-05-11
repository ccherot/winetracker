console.log("models: product.js")
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var WineSchema = new mongoose.Schema({
 producer: {type: String, required: true},
 vintage: { type: String, required: true }, //how to deal with N.V.?
 varietal: {type: String, required: false}, //could be multiple comma separated. Array?
 domain: { type: String, required: false}, 
 cuvee: { type: String, required: false},
 country: { type: String, required: false }, 
 region: { type: String, required: false }, 
 appellation: {type: String, required: false },
 color: { type: String, required: false }

}, { timestamps: true });

mongoose.model('Wine', WineSchema);
//var Wine = mongoose.model('Wine');
