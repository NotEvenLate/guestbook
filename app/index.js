var express = require('express');
var fs = require('fs');
var app = express();

// Root
app.use(express.static('/public'));

// Homepage
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});


// Guestbook
app.get('/guestbook', function(req, res){


    var data = require(__dirname + '/public/example.json');
    var results = '<table border="1">';

    for (var i=0; i < data.length; i++){
        results +=
        '<tr>' +
        '<td>' +data[i].username+'</td>' +
        '<td>' +data[i].country+'</td>' +
        '<td>' +data[i].date+'</td>' +
        '<td>' +data[i].message+'</td>' +
        '</tr>';
    }
    res.send(results);
});


// New message
app.get('/newmessage', function(req, res){
    res.sendFile(__dirname + '/public/newmessage.html');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/newmessage', function(req, res){
    var data = require(__dirname + '/public/example.json');
    data.push({
        username: req.body.name,
        country: req.body.country,
        date: new Date(),
        message: req.body.message
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile(__dirname + '/public/example.json', jsonStr, err => {
        if (err) throw err;
    });
});


// AJAX message
app.get('/ajaxmessage', function(req, res){
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});

app.post('/ajaxmessage', function(req, res){
    var name = req.body.name;
    var country = req.body.country;
    var message = req.body.message;

    console.log(name);

    res.send("Form was submitted: " + name + " " + country + " " + message);
});


// Error message
app.get('*', function(req, res){
    res.send('Cant find the requested page', 404);
});


// Listen port 8081
app.listen(8081, function(){
});