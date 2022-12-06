var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

let portti = 3004;
let osoite = "127.0.0.1";
// http osoite: http://localhost:3004/asiakas/


app.use(bodyParser.json());

//app.use(function(req,res,next){setTimeout(next,1000)});


var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

//Esimerkin vuoksi käyttäjä ja salasana root root. Oikeassa sovelluksessa ei missään nimessä laiteta root root. 
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',      
    password : 'root',
    database : 'kandityo',
    dateStrings : true,
});

//GET
app.get('/asiakas', function (req,res) {
    
    console.log("Requesti", req.query);

    let id = req.query.Henk_ID || "";

    let etunimi = req.query.Etunimi || "";

    let sukunimi = req.query.Sukunimi || "";

    let osoite = req.query.Osoite || "";

    let postinro = req.query.Postinro || "";

    let postitmp = req.query.Postitmp || "";


    let query = "SELECT Henk_ID, Etunimi, Sukunimi, Osoite, Postinro, Postitmp from asiakas WHERE 1=1";

    if (etunimi != "") 
        query = query + " AND Etunimi like '" + etunimi + "%'";
        
    if (sukunimi != "") 
        query = query + " AND Sukunimi like '" + sukunimi + "%'";
        
    if (osoite != "") 
        query = query + " AND Osoite like '" + osoite + "%'";
        
    if (postinro != "") 
        query = query + " AND Postinro like '" + postinro + "%'";
        
    if (postitmp != "")
        query = query + " AND Postitmp like '" + postitmp + "%'";
        
    console.log("Get query:" + query);

    connection.query(query, function(error, result){

        if ( error ) {
        
            console.log("VIRHE", error);

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti : "Virhe koodissa."});

        } else {

            res.statusCode = 200;

            res.json(result);
            
        }
    });

    console.log("Get tehty")
});

//GET
app.get('/henkilo', function (req,res) {
    
    console.log("Requesti", req.query);

    let id = req.query.ID || "";

    let etunimi = req.query.Etunimi || "";

    let sukunimi = req.query.Sukunimi || "";

    let osoite = req.query.Osoite || "";

    let postinro = req.query.Postinro || "";

    let postitmp = req.query.Postitmp || "";

    let aikuinen = req.query.Aikuinen || "";

    let query = "SELECT ID, Etunimi, Sukunimi, Osoite, Postinro, Postitmp, Aikuinen from henkilo WHERE 1=1";

    if (etunimi != "") 
        query = query + " AND Etunimi like '" + etunimi + "%'";
        
    if (sukunimi != "") 
        query = query + " AND Sukunimi like '" + sukunimi + "%'";
        
    if (osoite != "") 
        query = query + " AND Osoite like '" + osoite + "%'";
        
    if (postinro != "") 
        query = query + " AND Postinro like '" + postinro + "%'";
        
    if (postitmp != "")
        query = query + " AND Postitmp like '" + postitmp + "%'";

    if (aikuinen != "")
        query = query + " AND Aikuinen like '" + aikuinen + "%'";
        
    console.log("Get query:" + query);

    connection.query(query, function(error, result){

        if ( error ) {
        
            console.log("VIRHE", error);

            res.statusCode = 400;

            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});

        } else {

            res.statusCode = 200;

            res.json(result);
            
        }
    });

    console.log("Get tehty")
});

//DELETE
app.delete('/asiakas/:id', (req,res) => {

    console.log("/asiakas. PARAMS:", req.params);

    let id = req.params.id;

    let query = "DELETE FROM asiakas where Henk_ID = ?";

    console.log("Delete query: " + query);

    connection.query(query, [id],function(error, result) {

        if (error) {

            console.log("VIRHE");
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
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
    
    let query = "INSERT INTO asiakas (Etunimi, Sukunimi, Osoite, Postinro, Postitmp) values (?, ?, ?, ?, ?)";

    console.log("Post query:" + query);

    connection.query(query, [etunimi,sukunimi,osoite,postinro,postitmp], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, etunimi : etunimi, sukunimi : sukunimi, osoite : osoite, postinro : postinro, postitmp : postitmp})
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

    console.log("Muokkaa query:" + query);

    connection.query(query, [etunimi, sukunimi, osoite, postinro, postitmp, id], function(error, result) {

        if (error) {

            console.log("VIRHE!", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
    
        }

        else {

            console.log("R:",result);
            res.statusCode = 204;

            res.json();
        }
        
    })
});


app.listen(portti, osoite, () => {

});

module.exports = app