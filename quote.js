var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));
app.use(cors());

app.get('/test',function(request, response){
    response.send("Yus it works");
});

app.post('/login', function(request, response){    
    pg.connect(connectionString, function(err, client, done){
        response.send("Yayayaya");
    });
//   pg.connect(connectionString, function(err, client, done){
//       var username = request.body.username;
//       var password = request.body.password;
//       var query = 'SELECT username'+
//               'FROM users WHERE username = $1';
//       client.query(query, [username], function(err, result){
//           done();
//           if(err){
//               response.statusCode = 500;
//               response.send("Error: "+err);
//           }else{
//               console.log("Result: "+result);
//               //var s = {"author":author, "text":text};
//               response.send("Result: "+result);
//           }
//       });
//   }); 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});