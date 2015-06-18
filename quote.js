var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var pg = require('pg');
var password = require('password-hash-and-salt');
var connectionString = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));
app.use(cors());

app.post('/add', function (request, response) {
    pg.connect(connectionString, function (err, client, done) {
        var username = 'ballas';
        var userpassword = '12345';
        password(userpassword).hash(function (error, hash) {
            if (error) {
                console.log("Failed to hash pass");
            }
            response.send(hash);
            query = 'INSERT INTO users(username, password) VALUES($1,$2)';
            client.query(query, [username, hash], function (err, result) {
                done();
                if (err) {
                    response.statusCode = 500;
                    response.send(err);
                } else {
                    response.send(username + " " + hash);
                }
            });
        });
    });
});

app.post('/login', function(request, response){    
    pg.connect(connectionString, function(err, client, done){
        var username = request.body.username;
        var userpassword = request.body.password;
        var query = 'SELECT *'+
            'FROM users WHERE username = $1';
        
        client.query(query,[username],function(err, result){
           done();
           if(err){
               response.statusCode = 500;
               response.send(err);
           }else{
               if(result.rows.length === 0){
                   response.statusCode = 401;
                   response.send("Unauthorized access");
               }else{
                   password(userpassword).hash(function(error, hash){
                      if(error){
                          response.statusCode = 500;
                          response.send(error);
                      }else{
                         password(result.row[0].password).verifyAgainst(hash, function(error, verified){
                           if(error){
                               response.statusCode = 500;
                               response.send(error);
                           }else if (!verified){
                               response.statusCode = 401;
                               response.send("Unauthorized access");
                           }else{
                               response.send(result.row.username+" login Success");
                           }  
                         }); 
                      } 
                   });
               }               
           }
        });        
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});