// var express = require('express'); 
// const mysql = require('mysql');
// var hostname = 'localhost'; 
// var port = 8080; 
// var app = express(); 
// var myRouter = express.Router();

// var bodyParser = require("body-parser"); 
// var passport = require("passport");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "api_poisson",
//   port: "8889"
// });

// db.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected!");
// });

// myRouter.route('/peche/poissons')
// // GET ALL
//     .get(function(req,res){ 
//         db.query('SELECT * FROM poisson'), (err, result) => {
//             if (err) {
//                 res.json(error(err.message))
//                 console.log('Pas de réponse')
//             } else {
//                 res.json(success(result))
//                 console.log('Voici les poissons')
//             }
//         };
//     })

// myRouter.route('/peche/poisson/add')
// //POST Ajouter 
// .post(function(req,res){
//     db.query('INSERT INTO poisson (nom, espece, taille, poids, lieu, date) VALUES(?,?,?,?,?,?)'), [nom, espece, taille, poids, lieu, date], (err, result) => {
//         if (err) {
//             res.json(error(err.message))
//         } else {
//             res.json(success(result))
//         }
//     };
// })

// myRouter.route('/peche/poisson/update:id')
// //PUT
// app.put(function(req,res){ 
//       res.json({message : "Mise à jour des informations de votre poisson", methode : req.method});
//       db.query("UPDATE poisson SET nom = 'req.body.nom' , espece = 'req.body.espece' , taille = 'req.body.taille' , poids = 'req.body.poids' , lieu = 'req.body.lieu' , date = 'req.body.lieu' WHERE id=req.id")
// })
// //DELETE
// app.delete('/peche/poisson/delete:id', function(req,res){ 
// res.json({message : "Suppression d'un poisson", nom: req.body.nom, methode : req.method});  
// }); 
 
// // Nous demandons à l'application d'utiliser notre routeur
// app.use(myRouter);  
 
// // Démarrer le serveur 
// app.listen(port, hostname, function(){
// 	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
// });

// app.use(myRouter)

// app.listen(console.log(`Ecoute sur le port : ${port}`)) 


// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// //jwt stuff
// const jwt = require("jsonwebtoken");

// //passport stuff
// const passport = require("passport");
// const jwtStrategry  = require("./config/jwt")
// passport.use(jwtStrategry);

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.send("hello express server")
// })

// app.post("/login", (req, res) => {
//     let { email, password } = req.body;
//     //This lookup would normally be done using a database
//     if (email === "") {
//         if (password === "") { //the password compare would normally be done using bcrypt.
//             const opts = {}
//             opts.expiresIn = 120;  //token expires in 2min
//             const secret = "SECRET_KEY" //normally stored in process.env.secret
//             const token = jwt.sign({ email }, secret, opts);
//             return res.status(200).json({
//                 message: "Auth Passed",
//                 token
//             })
//         }
//     }
//     return res.status(401).json({ message: "Auth Failed" })
// });

// app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.status(200).send("YAY! this is a protected Route")
// })

// app.listen(3001);



const passport = require('passport');
var express = require('express'); 
const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
  });