console.log('user model');
var mongoose = require('mongoose');

//require the bcrypt modules
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema


//var Cellars = mongoose.SchemaType()

//UserSchema must include:
//  email
//  firstName
//  lastName
//  password
//  birthday

var UserSchema = new mongoose.Schema ({
    
    email: { 
        type: String,
        required: true,
        trim: true, 
        unique: true, 
        validate: [{
            validator: function (emailString){
                console.log("this is the email validator within the email UserSchema definition")
                return ( emailString.indexOf('@') != -1 && emailString.indexOf('.') != -1)
            },
            message: "{ VALUE } is not a valid email."
        }]
    },
    
    password: {
        type: String,
        required: true,
        minlength: 8, 
        maxlength: 32,
        trim: true,
        validator: { function (passwordString){
                console.log("this is the password validator function that checks the regex patterd for the password.")
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( passwordString );
            },
        message: "Password failed validation, you must have at least 1 number, uppercase and special character" }, 
        //select: false
    },
    /*
    passwordHash: {
        type: String
    },
    //TODO: THIS SHOULD BE REMOVED AND CLIENT-SIDE PASSWORD CONFIRM VALIDATION CAN BE USED
    passwordConfirm: {
        //ALL YOU NEED TO DO IS CHECK TO SEE IF THIS IS THE SAME AS THE PASSWORD WHICH HAS ITS OWN REGEXT VALIDATION

        //make sure this is also a valid password - you can use cient-side
        //validadtion 
        type: String,
        required: true,
        minlength: 8, 
        maxlength: 32,
        trim: true,
        validator: function (passwordString){
            //return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( passwordString );
            console.log("passwordConfirm validator: psswordString is " + passwordString + " and this.password is " + this.password)
            return passwordString == this.password
        },
        message: "Password Confirm failed validation, password and confirm password must be the same.",
        selecte: false
    },
    */
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        //TODO: DATE VALIDATION?
        type: Date, 
        required: true
    }, 
    cellars: [{type: Schema.Types.ObjectId, ref: 'Cellar', required: false}] //[Cellars]//cellar attached to this user //
}, {timestamps: true})

//TODO: how do I only run this validation for new users at registration?
/*
UserSchema.path('email').validate(function(value, done) {
    console.log("this is the validation function in the UserSchema.path('email').validate... function ")
    this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Email already exists');
*/

UserSchema.pre('save', function (done){
    //get reference to this user scope
    var user = this
    bcrypt.genSalt(function (err, salt){
        if (err) { console.log("there was an error creating bcrypt salt") }
        else {
            console.log("genSalt callback: this.password ", user.password)
            bcrypt.hash(user.password, salt, function (error, hash){
                if (error) { console.log("there was an error creating bcrypt password hash") 
                    return done(error)    
                }
                else {
                    user.password = hash
                    console.log("UserSchema.pre: encrypted password is ", user.password )
                    done()
                }
            })
        }
    })    
})

UserSchema.pre('update', function (done){
    console.log("UserSchema.pre: update > password is ", this.getUpdate().$set.password) //this.getUpdate().user
    //get reference to this user scope
    userScope = this
    var user = this.getUpdate().$set
    
    console.log("is " + user.password + " a valid password? => ", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(user.password))

    //do they still have a valid password?
    if ( !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(user.password)) )
        return done("Invalid Password")

    bcrypt.genSalt(function (err, salt){
        if (err) { console.log("there was an error creating bcrypt salt") }
        else {
            console.log("genSalt callback: this.password ", user.password)
            bcrypt.hash(user.password, salt, function (error, hash){
                if (error) { console.log("there was an error creating bcrypt password hash") 
                    return done(error)    
                }
                else {
                    userScope.getUpdate().$set.password = hash //user.password = hash
                    console.log("UserSchema.pre: encrypted password is ", user.password )
                    //this.update({}, {$set: { password: hash } })
                    done()
                }
            })
        }
    })    
})

var User = mongoose.model('User', UserSchema)