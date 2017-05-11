console.log('wines controller');

var mongoose = require('mongoose')
var Cellar = mongoose.model("Cellar")
var CellarItem = mongoose.model("CellarItem")

module.exports = {    
    //this returns a list of all cellarItems from a certain cellar
    getCellar: function(req, res) {
        // This is where we will retrieve the CellarItems contained in the cellar 
        //and populate each cellar item with its wine as well
        console.log("controllers: cellars.js > getCellar called for ", req.params.id)
        Cellar.findById(req.params.id).populate({path: 'cellarItems', populate: { path: 'wine'} } ).exec(function (err, cellar){ //had 'wines' instead of cellarItems 
            if (err)
            {
                console.log("ERROR: Error retrieving wines from cellar ", req.params.id)
            }
            else
            {
                console.log("retrieved cellar is: ", cellar)
                res.json(cellar)
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

    addCellar: function (req, res) {
        console.log("controllers/cellars.js > addCellar > req.body is ", req.body)
        var cellar = new Cellar()
        cellar.cellarName = req.body.cellarName
        cellar.save( function (err, cellar) {
            if (err) { 
                console.log("ERROR: there was an error saving new cellar named ", req.body.cellarName) 
                res.json(err)
            }

            else {
                console.log("controllers/cellars.js > successfully saved cellar named ", cellar.cellarName)
                res.json(cellar)
            }
        })
    },

    updateCellar: function (req, res) {
        console.log("controllers/cellars.js > updateCellar > req.body is ", req.body)

        //try updating the cellar to see if it updates only the included / changed properties
        Cellar.update({_id: req.body._id}, req.body, function (err){
            if (err) { 
                console.log("ERROR: controllers/cellars.js > there was an error updating cellar ", req.body._id)
                res.json(err)
            }
            else{
                console.log("controllers/cellars.js > successfully updated cellar ", req.body._id)
                res.json(true)
            }
        })

        /*
        //what we are doing here is finding the cellar we want to update, changing its name,
        //and then calling update.  This is so that we not delete the ites by overwriting

        Cellar.findOne({_id: req.body._id}, function (err, cellar){
            if (err) { 
                console.log("ERROR: there was an error finding cellar ", req.body._id)
                res.json(err)
            }
            else {
                //change the name of the cellar
                cellar.cellarName = req.body.cellarName
                Cellar.update({_id: req.body._id}, cellar, function (err){
                    if (err) { 
                        console.log("ERROR: controllers/cellars.js > there was an error updating cellar ", req.body._id)
                        res.json(err)
                    }
                    else{
                        console.log("controllers/cellars.js > successfully updated cellar ", req.body._id)
                        res.json(true)
                    }
                })
            }
        })
        */
    }

/*
        Cellar.findOne({_id: req.body._id}, function (err, cellar){
            if (err) { 
                console.log("ERROR: there was an error finding cellar ", req.body._id)
                res.json(err)
            }
            else {
                console.log("controllers/cellars.js > success > found cellar ", req.body.id)
                cellar.cellarName = req.body.cellarName
                cellar.update(cellar, function (err){
                    if (err) { 
                        console.log("ERROR: controllers/cellars.js > there was an error saving cellar ", cellar._id)
                        res.json(err)
                    }
                    else{
                        console.log("controllers/cellars.js > successfully updated cellar ", cellar._id)
                        res.json(cellar)
                    }
                })
            }
        })
    }
*/
}