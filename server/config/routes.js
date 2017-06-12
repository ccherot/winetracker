//we are going to need the following routes

//need path because of the last route that is handling the 
//case where the use types in a URL
var path = require('path')

//need reference to controllers for wines and users
var wines = require('../controllers/wines.js')
var users = require("../controllers/users.js")
var cellars = require("../controllers/cellars.js")
var cellarItems = require("../controllers/cellarItems.js")

// this adds route listeners to users and wines 
module.exports = function(app){

    //these are the user related routes

    //TODO: do we want future functionality for 
    //searching other user's cellars (if they are made public?)

    //this will get all the users
    app.get('/users', function(req, res) {
        users.getUsers(req, res);
    });

    //this should create a new user
    app.post('/register', function(req, res) {
        users.register(req, res);
    });

    //this should attempt to login an existing user
    app.post('/login', function(req, res) {
        users.login(req, res);
    });


    //this will delete a user
    app.delete('/users/:id', function(req, res) {
        users.deleteUser(req, res);
    });

    //this will update a user's profile info
    app.patch('/users', function(req, res) {
        users.updateUser(req, res);
    });

    //this will allow a user to change their password
    app.post('/users/changepassword', function (req, res) {
        users.changePassword(req, res);
    })


    //
    //Wine Routes
    //

    //this will get all the wines in the db. This can be useful for initially populating a cellar 
    //this should probably paginate somehow or maybe the process can be broken up 
    //TODO: how to get n number of records and then get the next n records 
    //this might not be a good route to use...maybe force users to search by region before adding?
    app.get('/wines', function(req, res) {
        wines.getAllWines(req, res);
    });

    //This route searches ALL wines using a given query
    app.get('/winesearch', function(req, res) {
        wines.searchWines(req, res);
    });

    //this will post new wines
    app.post('/wines', function(req, res) {
        wines.addWine(req, res);
    });

    //this will delete a wine.  this should 
    //only be done by an administrator
    app.delete('/wines/:id', function(req, res) {
        wines.deleteWine(req, res);
    });

    //this will update a wine.  Should this be an admin only route?  
    app.patch('/wines', function(req, res) {
        wines.updateWine(req, res);
    });

    //
    //CELLAR ROUTES
    //

    //these routes are for user cellars so they are more 
    //related to collections of wines than individual wines.
    //This app could be useful for professional wine cellar managers

    //this should create a new cellar attached to a user
    app.post('/cellar', function(req, res) {
        cellars.addCellar(req, res);
    });

        
    //this gets all the wines in a specific user's cellar
    app.get('/cellar/:id', function (req, res){
        cellars.getCellar(req, res) 
    })

    //this route deletes a cellar from a user's profile.
    //probably not going to be used much...I hope
    app.delete('/cellar/:id', function (req, res){
        cellars.deleteCellar(req, res)
    })

    //this route allows a user to update a cellar name
    app.patch('/cellar', function (req, res){
        cellars.updateCellar(req, res)
    })

    //
    //CellarItem Routes
    //

    app.patch('/cellaritem', function (req, res) {
        cellarItems.updateCellarItem(req, res)
    })

    //this route adds a new cellar item to the cellar
    app.post('/cellaritem', function (req, res){
        cellarItems.addToCellar(req, res)
    })


    //this route deletes a CellarItem.  This will likely not get used
    //unless there is something very wring wit the CellarItem or maybe if
    //it is a duplicate.  Most of the time a CellarItems quantity will simply
    //be adjusted or the info will be edited in some way.  CellarItems with a 
    //quantity of 0 will be moved to a different list of 'consumed' wines 
    //perhaps.  
    app.delete('/cellaritem/:id', function (req, res){
        cellarItems.deleteFromCellar(req, res)
    })



}