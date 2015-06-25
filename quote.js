var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var expressSession = require('express-session');
var pg = require('pg');
var password = require('password-hash-and-salt');
var cookie = require('cookie');
var cookieSignature = require('cookie-signature');
var uuid = require('node-uuid');
var connectionString = process.env.DATABASE_URL;

app.use(function(req, res, next) {
 
    var sessionId = req.param('sessionId');
 
    // if there was a session id passed add it to the cookies
    if (sessionId) {
 
        var header = req.headers.cookie;
 
        // sign the cookie so Express Session unsigns it correctly
        var signedCookie = 's:' + cookieSignature.sign(sessionId, 'keyboard cat');
 
        req.headers.cookie = cookie.serialize('connect.sid', signedCookie);
 
    }
 
    next();
 
});
app.use(function(req, res, next) {
 
    expressSession({
        'cookie': {
            'httpOnly': false,
            'maxAge': 1000 * 60 * 60 * 24 * 60
        },
        'name': 'connect.sid',
        'secret': 'keyboard cat',
        'saveUninitialized': true,
        'genid': function() {
 
            var sessionId = req.param('sessionId');
 
            if (sessionId) {
                return req.param('sessionId');
            }
 
            return uuid;
 
        }
 
    })(req, res, next);
 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+"/public"));
app.use(cors());

app.post('/create', function (request, response) {
    pg.connect(connectionString, function (err, client, done) {
        var username = request.body.username;
        var userpassword = request.body.password;
        password(userpassword).hash(function (error, hash) {
            if (error) {
                console.log("Failed to hash pass");
            }            
            query = 'INSERT INTO users(username, password) VALUES($1,$2)';
            client.query(query, [username, hash], function (err, result) {
                done();
                if (err) {
                    response.statusCode = 500;
                    response.send(err);
                } else {                    
                    response.send(result);
                }
            });
        });
    });
});

app.get('/neptune-1',function(request, response){
    var date = new Date().toISOString();
    if(request.session.cookie.expires > date){
        pg.connect(connectionString, function(err, client, done){
                var query = 'SELECT neptune FROM users WHERE sessionid=$1';
                var sessionid = request.sessionID();
                client.query(query,[sessionid],function(err,result){
                if(err){
                    response.statusCode = 500;
                    response.send(err);
                }else{
                    if(result.rows.length === 0){
                        response.statusCode = 401;
                        response.send("Unauthorized access");
                    }else{
                        response.send(result);
                    }
                }
            });               
        });
    } 
});

app.get('/uranus-1',function(request, response){
    var date = new Date().toISOString();
    if(request.session.cookie.expires > date){
        pg.connect(connectionString, function(err, client, done){
                var query = 'SELECT uranus FROM users WHERE sessionid=$1';
                var sessionid = request.sessionID();
                client.query(query,[sessionid],function(err,result){
                if(err){
                    response.statusCode = 500;
                    response.send(err);
                }else{
                    if(result.rows.length === 0){
                        response.statusCode = 401;
                        response.send("Unauthorized access");
                    }else{
                        response.send(result);
                    }
                }
            });               
        });
    } 
});

app.get('/saturn-1',function(request, response){
    var date = new Date().toISOString();
    if(request.session.cookie.expires > date){
        pg.connect(connectionString, function(err, client, done){
                var query = 'SELECT saturn FROM users WHERE sessionid=$1';
                var sessionid = request.sessionID();
                client.query(query,[sessionid],function(err,result){
                if(err){
                    response.statusCode = 500;
                    response.send(err);
                }else{
                    if(result.rows.length === 0){
                        response.statusCode = 401;
                        response.send("Unauthorized access");
                    }else{
                        response.send(result);
                    }
                }
            });               
        });
    } 
});

app.post('/loggedin',function(request, response){    
    var date = new Date().toISOString();
    //console.log(request.session.cookie.expires > date);
    //if(request.session.cookie.expires > date){
        pg.connect(connectionString, function(err, client, done){
            var query = 'SELECT username FROM users WHERE sessionid=$1';
            var sessionid = request.sessionID();
            client.query(query,[sessionid],function(err,result){
                if(err){
                    response.statusCode = 500;
                    response.send(err);
                }else{
                    if(result.rows.length === 0){
                        response.statusCode = 401;
                        response.send("Unauthorized access");
                    }else{
                        response.send(result);
                    }
                }
            });
        });
    //}    
});

app.post('/login', function(request, response){    
    pg.connect(connectionString, function(err, client, done){
        var username = request.body.username;
        var userpassword = request.body.password;
        var qGetUser = 'SELECT * FROM users WHERE username=$1';
        var qUpdateSesId = 'UPDATE users SET sessionid=$1 WHERE username=$2';
        client.query(qGetUser,[username],function(err,result){
            if(err){
                response.statusCode = 500;
                response.send(err);
            }else{
                if(result.rows.length === 0){
                    response.statusCode = 401;
                    response.send("Unauthorized access");                    
                }else{
                    pass = result.rows[0].password;
                    password(userpassword).verifyAgainst(result.rows[0].password, function(error, verified){
                        if(error){
                            response.statusCode = 500;
                            response.send(error);
                        }else if (!verified){
                            response.statusCode = 401;
                            response.send("Unauthorized access");
                        }else{
                            addSessionId();
                        }
                    });
                    
                }
            }            
        });
        var addSessionId = function(){            
            client.query(qUpdateSesId,[request.sessionID(),username],function(err, result){
                if(err){
                    response.statusCode = 500;
                    response.send(err);                    
                }else{
                    response.send("user: "+username);
                }
            });            
        };
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
