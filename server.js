var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

let port = 3004;
let hostname = "127.0.0.1";

app.use(bodyParser.json());

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',      
    password : 'root',
    database : 'customer',
    dateStrings : true
});

// REST api -> GET 
app.get('/asiakas', (req,res) => {
    // localhost:3000/asiakas
    
    console.log("/asiakas. REQ:", req.query);
    let query = "SELECT * from asiakas";
    
    console.log("query:" + query);
    connection.query(query, function(error, result, fields){

        console.log("done")
        if ( error )
        {
            console.log("Virhe", error);
            res.json({status : "NOT OK", msg : "Tekninen virhe!"});
        }
        else
        {
            res.statusCode = 200;
            res.json(result);
        }
    });

    console.log("Kysely tehty")
});

/******************************* */

app.get('*',function(req, res){
    console.log("R:", req.url);
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end("Virheellinen osoite");
});

console.log("Servu tulilla");

    app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app