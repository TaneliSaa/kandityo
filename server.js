var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { query } = require('express');

let port = 3004;
let hostname = "127.0.0.1";
// http osoite: http://localhost:3004/asiakas/


app.use(bodyParser.json());

app.use(function(req,res,next){setTimeout(next,1000)});

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

//Esimerkin vuoksi käyttäjä ja salasana root root, ei sitten oikeissa töissä näin
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',      
    password : 'root',
    database : 'kandityo',
    dateStrings : true,
});

//GET
app.get('/asiakas', (req,res) => {
    
    console.log("/asiakas. REQ:", req.query);

    let id = req.query.Henk_ID || "";

    let etunimi = req.query.Etunimi || "";

    let sukunimi = req.query.Sukunimi || "";

    let osoite = req.query.Osoite || "";

    let postinro = req.query.Postinro || "";

    let postitmp = req.query.Postitmp || "";

    let sahkoposti = req.query.Sahkoposti || "";

    let salasana = req.query.Salasana || "";

    let taulukko = [id];

    let query = "SELECT Henk_ID, Etunimi, Sukunimi, Osoite, Postinro, Postitmp, Sahkoposti, Salasana from asiakas WHERE 1=1";

    if (etunimi != "") {
        query = query + " AND Etunimi = ? ";
        taulukko.push(etunimi);
    }
    

    if (sukunimi != "") {
        query = query + " AND Sukunimi = ? ";
        taulukko.push(sukunimi);
    }

    if (osoite != "") {
        query = query + " AND Osoite = ? "; 
        taulukko.push(osoite);
    }

    if (postinro != "") {
        query = query + " AND Postinro = ? ";
        taulukko.push(postinro);
    }
        
    

    if (postitmp != "") {
        query = query + " AND Postitmp = ? ";
        taulukko.push(postitmp);
    }
        
    

    if (sahkoposti != "") {
        query = query + " AND Sahkoposti = ? ";
        taulukko.push(sahkoposti);
    }
        
    

    if (salasana != "") {
        query = query + " AND Salasana = ? ";
        taulukko.push(salasana);
    }
        
    

    console.log("query:" + query);
    connection.query(query,[taulukko], function(error, result, fields){

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
            console.log(taulukko)
        }
    });

    console.log("Kysely tehty")
});


//DELETE
app.delete('/asiakas/:id', (req,res) => {

    console.log("/asiakas. PARAMS:", req.params);

    let id = req.params.id;

    let query = "DELETE FROM asiakas where Henk_ID = ?";

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

//POST
app.post('/asiakas', (req,res) => {

    console.log("/asiakas. BODY:" ,req.body);

    let etunimi = req.body.Etunimi;
    let sukunimi = req.body.Sukunimi;
    let osoite = req.body.Osoite
    let postinro = req.body.Postinro;
    let postitmp = req.body.Postitmp;
    let sahkoposti = req.body.Sahkoposti;
    let salasana = req.body.Salasana



    let query = "INSERT INTO asiakas (Etunimi, Sukunimi, Osoite, Postinro, Postitmp, Sahkoposti, Salasana) values (?, ?, ?, ?, ?, ?, ?)";

    console.log("query:" + query);

    connection.query(query, [etunimi,sukunimi,osoite,postinro,postitmp,sahkoposti,salasana], function(error,result,fields) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({status : "NOT OK", msg : "Tekninen virhe!"});
        }

        else {

            console.log("R:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, etunimi : etunimi, sukunimi : sukunimi, osoite : osoite, postinro : postinro, postitmp : postitmp, sahkoposti : sahkoposti, salasana : salasana})
        }
    })


});

//PUT
app.put('/asiakas/:id', (req,res) => {

    console.log("/asiakas. PARAMS", req.params);
    console.log("/asiakas", req.body);

    let etunimi = req.body.Etunimi;
    let sukunimi = req.body.Sukunimi;
    let osoite = req.body.Osoite
    let postinro = req.body.Postinro;
    let postitmp = req.body.Postitmp;

    let id = req.params.id;

    let query = "UPDATE asiakas SET Etunimi=?, Sukunimi=?, Osoite=?, Postinro=?, Postitmp=? WHERE Henk_ID=?";

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