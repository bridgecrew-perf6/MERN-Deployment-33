
const express = require("express") //import express
const cors = require('cors');
const app = express(); //initialize express

// const port = 8000; //specify port in variable 
const port = 8000;

//These 2 lines are needed to be able to read and extract the information received from post, put, and patch requests:
app.use(express.json()); //tells my app that it can parse json
app.use(express.urlencoded({ extended: true })); //tells my app that it can gather form information

app.use(cors());

// connecting to our mongodb database using mongoose
require("./server/config/mongoose")


//import the routes and pass the app object to the routes
require('./server/routes/pet.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));