var express = require('express'); 
var hostname = 'localhost'; 
var port = 8080; 
var app = express(); 
var myRouter = express.Router();

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

myRouter.route('/peche/name')
// GET
.get(function(req,res){ 
	  res.json({message : "Carnet de pêche", methode : req.method});
})
//POST
app.post('/peche/name/add', function(req,res){
      res.json({message : "Ajout d'un nouveau poisson" , espece : req.body.espece, nom : req.body.nom, methode : req.methode});
})
//PUT
app.put('/peche/name/update', function(req,res){ 
      res.json({message : "Mise à jour des informations de votre poisson", methode : req.method});
})
//DELETE
app.delete('/peche/name/delete', function(req,res){ 
res.json({message : "Suppression d'un poisson", nom: req.body.nom, methode : req.method});  
}); 

//LOGIN
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json({message : "Espace de connection"})
    res.redirect('/peche/' + req.user.username);
  });
 
// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});
