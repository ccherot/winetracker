console.log('wines controller');

var mongoose = require('mongoose')
var Cellar = mongoose.model("Cellar")
var CellarItem = mongoose.model("CellarItem")

module.exports = {    
    //this should return a list of all wines from a certain cellar
    getCellar: function(req, res) {
        // This is where we will retrieve the wines contained in the cellar 
        Products.find(req.params._id).populate('wines').exec(function (err, wines){
            if (err)
            {
                console.log("ERROR: Error retrieving wines from cellar ", req.params._id)
            }
            else
            {
                console.log(wines.length + " wines were retrieved from the database")
                res.json(wines)
            }
        })
    },

    
   deleteCellar: function(req,res){
        console.log("controllers: cellars.js > delete > req.params.id is ", req.params.id)
        Cellar.remove({_id: req.params.id}, function (err){
            if (err) {
                var errStr = "There was an error deleting cellar " + req.params.id + " from the database"
                console.log(errStr)
                res.json(err)
            }
            else{
                console.log("successfully deleted cellar " + req.params.id + " from the database")
                res.json(true)
            }
        })
    },


}