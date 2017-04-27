//require express
var express = require('express')

//require path
var path = require('path')

//require body-parser
var bodyParser = require('body-parser')

//create an express app
var app = express()

//tell express to use body parser and to use extended 
//and json so that we can parse the json in the req.body
//app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//tell express where the static files are.  This is the 
//dist folder for our Angular front end code
app.use(express.static(path.join(__dirname, './winetracker-app/dist')))

//require mongoose for our MongoDB connectivity
require ('./server/config/mongoose.js')

//define the routes_setter
var routes_setter = require('./server/config/routes.js')

//invoke the function in the routes_setter and pass
//a reference to our express server
routes_setter(app)

//finally start the server
app.listen(8000, function (){
    console.log('winetracker listening on port 8000!!!')
})

