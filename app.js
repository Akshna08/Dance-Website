const express = require("express");
const { request } = require("http");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
/* const bodyparser = require("body-parser"); */
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/contactDance');
const port = 8000;

var contactSchema = new mongoose.Schema({
    fullName: String,
    FathersName: String,
    gender: String,
    Age: String,
    Phone: String,
    email: String,
    address: String,
    desc: String,
});

var contact = mongoose.model('contact',contactSchema);

app.use('/static', express.static('static')) // For serving static files
/* app.use(express.urlencoded()) */

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    console.log(myData); 
    myData.save().then(()=> {
        res.send("This item has been saved to the database")
    }).catch(()=> {
        res.status(400).send("Item has not saved in the database")
    });
    
});
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});