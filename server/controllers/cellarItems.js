console.log('wines controller');

var mongoose = require('mongoose')
var Cellar = mongoose.model("Cellar")
var CellarItem = mongoose.model("CellarItem")

module.exports = {        
    
    //update a wine's info by incrementing or decrementing a CellarItem's quantity
    //or changing some other info about it
    updateCellarItem: function(req,res){
        console.log("controllers/wines.js > update > req.body is ", req.body);
        Wine.update({_id: req.body._id}, req.body, function(err){
            if (err){
                console.log('ERROR: controllers/wines.js > update > there was an error updating wine: ' + req.body._id)
            }
            else{
                console.log('controllers/wines.js > update > successfully updated wine: ' + req.body._id)
                //TODO: SHOULD I RETURN THE UPDATED WINE?
                res.json(true)
            }
        })    
    },

    //completely remove a CellarItem from the DB
    deleteCellarItem: function(req,res) {
        console.log("controllers: wines.js > delete > req.params.id is ", req.params.id)
        Wine.remove({_id: req.params.id}, function (err){
            if (err) {
                var errStr = "There was an error deleting wine " + req.params.id + " from the database"
                console.log(errStr)
                res.json(err)
            }
            else{
                console.log("successfully deleted wine " + req.params.id + " from the database")
                res.json(true)
            }
        })
    },

    addToCellar: function (req, res) {
        //this creates a new CellarItem and appends it to the list 
        //of CellarItems in the cellar
        console.log("addWines addding CellarItem: ",  req.body);
        //add the id for a wine to the wines array of the cellar
        
        // Try to save that new wine to the database 
        Cellar.findOne({_id: req.params.cellarId}, function(err, cellar) {
            // if there is an error console.log that something went wrong!
            if(err) {
                console.log('something went while retrieving cell information for ', req.params.cellarId);
            } 
            else { // else console.log that we did well 
                console.log('successfully found cellar and now adding wine ', req.params.wineId);
                var newItem = new CellarItem(req.body)
                cellar.wines.push(newItem)
                cellar.save(function (err){
                    if (err) { console.log("ERROR: error saving new item to cellar ", cellar._id) }
                    else{
                        res.json(true);
                    }
                })
            }
        })
    },

}