console.log('wines controller');

var mongoose = require('mongoose')
var Wine = mongoose.model("Wine")

module.exports = {    
    //this should return a list of all wines 
    getAllWines: function (req, res) {
        console.log("controllers: wines.js > getWines called")
        Wine.find( {}, function (err, wines){
            if (err)
            {
                console.log("controllers: wines.js > getWines > there was an error retrieving wines")
                res.json(false)
            }
            else{
                console.log("controllers: wines.js > returning " + wines.length + " wines")
                res.json(wines)
            }
        })
    },

    searchWines: function(req, res) {
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        console.log("controllers/wines.js searchWines > seach query is ", req.body.search)
        Wine.find( {}, function (err, wines){
            if (err)
            {
                console.log("ERROR: Error retrieving wines from database")
            }
            else
            {
                console.log(wines.length + " wines were retrieved from the database")
                res.json(wines);
            }
        })
    },

    addWine: function (req, res) {
        console.log("addWines POST DATA", req.body);
        // create a new Wine with the name and age corresponding to those from req.body
        var wine= new Wine(req.body);
        // Try to save that new wine to the database 
        wine.save(function(err) {
            // if there is an error console.log that something went wrong!
            if(err) {
                console.log('something went wrong while saving a new wine');
            } 
            else { // else console.log that we did well 
                console.log('successfully added a new wine!');
                //return the new wine
                res.json(wine);
            }
        })
    },

    //update a wine's info
    updateWine: function(req,res){
        console.log("controllers/wines.js > update > req.body is ", req.body);

        //find and update the wine
        Wine.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},  function(err, wine){
            if (err){
                console.log('ERROR: controllers/wines.js > update > there was an error updating wine: ' + req.body._id)
            }
            else{
                console.log('controllers/wines.js > update > successfully updated wine: ', wine)
                //return the updated wine
                res.json(wine)
            }
        })    
    },

   deleteWine: function(req,res){
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


}