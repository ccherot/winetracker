console.log('users controller');

var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
var User = mongoose.model("User")

module.exports = {

    register: function(req,res){
        //create a new friend
        console.log("controller/users.js: create > req.body is ",req.body)
        var user = new User(req.body)
        user.save( function (err){
            if (err){
                console.log("ERROR: controller/users.js: create > error creating user", err);
                //res.json({error: "ERROR: controller/users.js: error saving new user data"});        
                res.json(err); 
            }
            else {
                console.log("controller/users.js: create > user successfully created")
                
                //strip the password and passwordconfirm off of the object returned
                delete user.password;
                delete user.passwordConfirm
                
                res.json(user)
                
            }

        })
    },

    login: function (req, res) {
        console.log("controllers: users.js > login called > req.body is ", req.body)
        //find the user and get their cellars as well...but not the CellarItems within the cellars!
        User.findOne({email: req.body.email}).populate('cellars').exec( function (err, user){
            if (err){
                console.log("login: error retrieiving data for user: " + req.body.email)
                //TODO: CREATE GENERIC LOGIN ERROR SO CLIENT DOES NOT KNOW IF
                //THE PASSWORD OR EMAIL IS INCORRECT.  THEY SHOULD NOT KNOW WHICH FOR 
                //SECURITY PURPOSES
                res.json(err)
            }
            else{
                if (!user)
                {
                    console.log("controllers: users.js > user is ", user)
                    res.json( {errors: {error: "user is null"} } )
                    return 
                }
                console.log("controllers: users.js > user.password is ", user.password)
                
                //if there is a user and a password then check against the DB
                //compare password sent and the one on the database

                //asynchronous method
                if (user.password)
                {
                    bcrypt.compare(req.body.password, user.password, function (err, result){
                        if (err) { 
                            console.log("controllers: users.js: ERROR: controllers: users.js > ERROR: passwords do not match")
                            res.json(err) 
                        }
                        else {
                            console.log("controllers: users.js: login: SUCCESS: " + user.email + " has successfully loged in" )
                            //strip off the password before sending the user object back
                            delete user.password;
                            delete user.passwordConfirm
                            console.log("controllers: users.js: login: SUCCESS: user is now ", user)
                            res.json(user);    
                        }
                    })
                }
                else {
                    res.json(false)
                }
            }
        })
    }, 

    //TODO:
    //this should return a list of user profiles but only
    //the public facing profile information 
    getUsers: function (req, res) {
        console.log("controllers: users.js > getUsers called")
        User.find({}, function (err, users){
            if (err)
            {
                console.log("controllers: users.js > getUsers > there was an error retrieving users")
                res.json(err)
            }
            else{
                console.log("controllers: users.js > returning " + user.length + " users")
                //TODO: COLLECT THE PUBLIC PROFILE PARTS OF THE USERS ONLY.
                //CREATE A COLLECTION AND SEND BACK. THIS IS PROBABLUY IMPRACTICAL
                //AND YOU MAY WANT TO IMPLEMENT A USER SEARCH FEATURE INSTEAD
                
                //removing the response for now 
                //res.json(users)
            }
        })
    },


    deleteUser: function(req,res){
        console.log("controllers: users.js > delete > req.params.id is ", req.params.id)
        User.remove({_id: req.params.id}, function (err){
            if (err) {
                var errStr = "There was an error deleting user " + req.params.id + " from the database"
                console.log(errStr)
                res.json(err)
            }
            else{
                console.log("successfully deleted user " + req.params.id + " from the database")
                res.json(true)
            }
        })
    },

    updateUser: function(req,res){
        console.log("controllers/users.js > update > req.body is ", req.body);
        //find and update the user and return the updated user doc with 
        //the cellar lsit populated  
        User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}).populate('cellars').exec( function(err, user){
        //User.update({_id: req.body._id}, req.body, function(err, user){
            if (err){
                console.log('ERROR: controllers/users.js > update > there was an error updating user: ' + req.body._id)
                res.json(err)
            }
            else{
                //always remove the password fields before returning the 
                //user object
                delete user.password
                delete user.passwordConfirm
                console.log('controllers/users.js > update > successfully updated user: ', user)
                res.json(user)
            }
        })    
    },



}