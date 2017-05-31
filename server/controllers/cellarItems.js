console.log('wines controller');

var mongoose = require('mongoose')
var Cellar = mongoose.model("Cellar")
var CellarItem = mongoose.model("CellarItem")

module.exports = {        
    
    //update a CellarItem's info 
    updateCellarItem: function(req,res){
        console.log("controllers/cellarItems.js > update > req.body is ", req.body);
        //update the item, find it, and send it back
        CellarItem.update({_id: req.body._id}, req.body, function(err){
            if (err){
                console.log('ERROR: controllers/cellarItems.js > update > there was an error updating cellarItem: ' + req.body._id)
                res.json(err)
            }
            else{
                console.log('controllers/cellarItems.js > update > successfully updated cellarItem: ', req.body._id)
                //return the updated item
                CellarItem.findById(req.body._id, function (err, item){
                    if (err) { 
                        console.log("controllers/cellarItems.js > updateCellarItem: error finding updatedItem to return to client")
                        res.json(err)
                    }
                    else {
                        console.log("controllers/cellarItems.js > updateCellarItem > successfully found item", item)
                        res.json(item)
                    }
                })
            }
        })    
    },

    //completely remove a CellarItem from the DB
    deleteCellarItem: function(req,res) {
        console.log("controllers: cellarItems.js > delete > req.params.id is ", req.params.id)
        Wine.remove({_id: req.params.id}, function (err){
            if (err) {
                var errStr = "There was an error deleting cellarItem " + req.params.id + " from the database"
                console.log(errStr)
                res.json(err)
            }
            else{
                console.log("successfully deleted cellarItem " + req.params.id + " from the database")
                res.json(true)
            }
        })
    },

    addToCellar: function (req, res) {
        //this creates a new CellarItem, saves it, and then and appends the id to the list 
        //of CellarItems in the cellar 
        //console.log("controllers: cellarItems.js > addToCellar > req is ",  req);
        console.log("controllers: cellarItems.js > addToCellar > req.body is ",  req.body);
        
        Cellar.findOne({_id: req.body.cellarId}, function(err, cellar) {
            // if there is an error console.log that something went wrong!
            if(err) {
                console.log('something went while retrieving cell information for ', req.body.cellarId);
            } 
            else { // else console.log that we succeeded 
                console.log('successfully found cellar ', cellar)
                console.log('successfully found cellar and now adding cellarItem ', req.body.cellarItem);
                var newItem = new CellarItem(req.body.cellarItem)//.populate({path: 'wine'}).exec( function (err){})
                // Try to save that new wine to the database 
                newItem.save(function (err){
                    if (err) { console.log("ERROR: error saving new item to cellar ", cellar._id) }
                    else {
                        cellar.cellarItems.push(newItem._id)
                        cellar.save(function (err){
                            if (err) { console.log("ERROR: error saving newItem " + newItem._id + "to cellar ", cellar._id) }
                            else{
                                //TODO: IF THE cellar.save() is unsuccessful, shoudl we delete the orphaned 
                                //CellarItem since it will just be not be embedded in any other document
                                //and will therefore be unreachable?
                                
                                //here we finally return the new CellarItem to the client
                                //after it has been successfully created AND successfully added to the 
                                //cellar....but not before we populat the embedded wine document!  
                                newItem.populate('wine', function (err){
                                    if (err) { 
                                        console.log("comtrollers: cellarItems.js > addToCellar > error populating wine in new CellarItem")
                                        res.json(err) 
                                    }
                                    else { 
                                        console.log("controllers: cellarItems.js > addToCellar > successfully populated wine in new CellarItem: ", newItem)
                                        res.json(newItem) 
                                    }
                                }) 
                            }
                        })
                        console.log("SUCCESS saving newItem " + newItem._id + "to cellar ", cellar._id) 
                        //return the newItem so it can be appended to the client side copy 
                        //of the 
                        
                    }
                })
            }
        })
    },

}