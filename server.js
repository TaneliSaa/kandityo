var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { query } = require('express');

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
    database : 'kandityo',
    dateStrings : true
});


app.get('/asiakas', (req,res) => {
    
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

app.delete('/asiakas/:id', (req,res) => {

    console.log("/asiakas. PARAMS:", req.params);

    let id = req.params.id;

    let query = "DELETE FROM asiakas where ID = ?";

    console.log("query: " + query);

    connection.query(query, [id],function(error, result, fields) {

        if (error) {

            console.log("VIRHE");
            res.statusCode = 400;
            res.json({status : "NOT OK", msg : "Tekninen virhe"});
        }

        else {

            console.log("R:" , result);
            res.statusCode = 204;
            res.json();
        }
    })


});

app.post('/asiakas', (req,res) => {

    console.log("/asiakas. BODY:" ,req.body);

    let etunimi = req.body.Etunimi;
    let sukunimi = req.body.Sukunimi;
    let osoite = req.body.Osoite
    let postinro = req.body.Postinro;
    let postitmp = req.body.Postitmp;



    let query = "INSERT INTO asiakas (Etunimi, Sukunimi, Osoite, Postinro, Postitmp) values (?, ?, ?, ?, ?)";

    console.log("query:" + query);

    connection.query(query, [etunimi,sukunimi,osoite,postinro,postitmp], function(error,result,fields) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({status : "NOT OK", msg : "Tekninen virhe!"});
        }

        else {

            console.log("R:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, etunimi : etunimi, sukunimi : sukunimi, osoite : osoite, postinro : postinro, postitmp : postitmp})
        }
    })


});

app.put('/asiakas/:id', (req,res) => {

    console.log("/asiakas. PARAMS", req.params);
    console.log("/asiakas", req.body);

    let etunimi = req.body.Etunimi;
    let sukunimi = req.body.Sukunimi;
    let osoite = req.body.Osoite
    let postinro = req.body.Postinro;
    let postitmp = req.body.Postitmp;

    let id = req.params.id;

    let query = "UPDATE asiakas SET Etunimi=?, Sukunimi=?, Osoite=?, Postinro=?, Postitmp=? WHERE ID=?";

    console.log("query:" + query);

    connection.query(query, [etunimi, sukunimi, osoite, postinro, postitmp, id], function(error, result, fields) {

        if (error) {

            console.log("VIRHE!", error);
            res.statusCode = 400;
            res.json({status : "NOT OK", msg : "Tekninen virhe"});
    
        }

        else {

            console.log("R:",result);
            res.statusCode = 204;

            res.json();
        }

    })



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