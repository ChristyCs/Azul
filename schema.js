var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var createQuery = "CREATE TABLE IF NOT EXISTS users"
        +"(username varchar(255) primary key not null,"
        +"password varchar(255) not null)";
//Create a author table
client.query(createQuery)
        .on('end',function(){           
                client.end();            
        });
