
// imports
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



//rutas
var routes = require('./routes/app');
var login = require('./routes/login');
var routesUser = require('./routes/usuario');


// use
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', routesUser);
app.use('/login', login);
app.use('/', routes);


mongoose.connection.openUri('mongodb://localhost:27017/Hospital', 
(error, res) => {
    if (error) throw error;
    console.log('Base de datos:\x1b[32m%s\x1b[0m', ' Online');
} );

app.listen(3000, ()=>{
    console.log('express on port 3000:\x1b[32m%s\x1b[0m', ' Online');
});