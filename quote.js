var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));
app.use(cors());


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});