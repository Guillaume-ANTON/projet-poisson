var express = require('express'); 
const mysql = require('mysql');
var hostname = 'localhost'; 
var port = 8080; 
var app = express(); 
var myRouter = express.Router();
const {success, error} = require('./functions')

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

var bodyParser = require("body-parser"); 
var passport = require("passport");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "api_poisson",
  port: "8889"
});

db.connect(function(err) {
  if(err) throw err;
  console.log("Connected!");
});

myRouter.route('/peche/poissons')
// GET ALL
.get(function(req,res){ 
    if (req.query.max != undefined && req.query.max > 0) {
        db.query('SELECT * FROM poisson LIMIT 0, ?', [req.query.max], (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {
                res.json(success(result))
            }
        })
    } else if (req.query.max != undefined) {
        res.json(error('Wrong max value'))
    } else {
        db.query('SELECT * FROM poisson', (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {
                res.json(success(result))
            }
        })
    }
})

myRouter.route('/pehce/poissons/:id')
// GET Poisson with id
.get(function(req, res){
    db.query('SELECT * FROM poisson WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {
            if (result[0] != undefined) {
                res.json(success(result[0]))
            } else {
                res.json(error('Wrong id'))
            }
        }
    })
})

myRouter.route('/peche/poisson/add')
//POST Ajouter 
.post(function(req,res){
    // db.query('INSERT INTO poisson (nom, espece, taille, poids, lieu, date) VALUES(?,?,?,?,?,?)'), [nom, espece, taille, poids, lieu, date], (err, result) => {
    //     if (err) {
    //         res.json(error(err.message))
    //     } else {
    //         res.json(success(result))
    //     }
    // };
    if (req.body.nom) {

        db.query('SELECT * FROM poisson WHERE nom = ?', [req.body.nom], (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {

                if (result[0] != undefined) {
                    res.json(error('name already taken'))
                } else {

                    db.query('INSERT INTO poisson(nom) VALUES(?)', [req.body.nom], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            db.query('SELECT * FROM poisson WHERE nom = ?', [req.body.nom], (err, result) => {

                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success({
                                        id: result[0].id,
                                        name: result[0].name
                                    }))
                                }

                            })

                        }
                    })

                }

            }
        })

    } else {
        res.json(error('no name value'))
    }
})

myRouter.route('/peche/poisson/update:id')
//PUT
app.put(function(req,res){ 
      res.json({message : "Mise à jour des informations de votre poisson", methode : req.method});
      db.query("UPDATE poisson SET nom = 'req.body.nom' , espece = 'req.body.espece' , taille = 'req.body.taille' , poids = 'req.body.poids' , lieu = 'req.body.lieu' , date = 'req.body.lieu' WHERE id=req.id")
})
//DELETE
app.delete('/peche/poisson/delete:id', function(req,res){ 
res.json({message : "Suppression d'un poisson", nom: req.body.nom, methode : req.method});  
}); 
 
// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});

app.use(myRouter)

app.listen(console.log(`Ecoute sur le port : ${port}`)) 

