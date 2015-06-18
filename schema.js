var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var createQuery = "CREATE TABLE IF NOT EXISTS author"
        +"(author varchar(255) primary key not null,"
        +"text varchar(255) not null)";
//Create a author table
client.query(createQuery)
        .on('end',function(){  
            
            var quotes = [
                    { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
                    { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
                    { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
                    { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
                ];
            var q;   
            
            //Goes through the quotes list and adds it to the database
            for(var i = 0; i < quotes.length; i++){
                var qeary = "INSERT INTO author(author, text) VALUES"
                        +"($1,$2)";
                q = client.query(qeary,[quotes[i].author,quotes[i].text]);
                q.on('error', function(){
                   console.log("Failed with: "+quotes[i].author+" : "+quotes[i].text); 
                });
            }
            
            q.on('end',function(){
                client.end();
            });
        });
