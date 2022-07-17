const express = require('express')
const app = express();
const port = process.env.port || 5501;
const mongoose = require("mongoose")
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("error in connecting to db"));
db.once('open', () => console.log("connected to db"))

app.post("/signup", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    var data = {
        "name": username,
        "email": email,
        "phno": phno,
        "password": password,
        "cpassword": cpassword,

    }
    db.collection('user').insertOne(data, (err, collection) => {
        if (err) {
            throw err;

        }

        console.log("Record Inserted successfully");
    });
    return res.redirect('index2.html')

})

app.get('/', (req, res) => {
    res.set({
        "ALLOW-access-ALLOW-Origin": '*'
    })
    return res.redirect('index.html')

}).listen(3000)

console.log("it is running");
