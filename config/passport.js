// import jwtSecret from './jwt'
// import bcrypt from 'bcrypt';
// import { response } from 'express';

// const BCRYPT_SALT_ROUNDS = 12;

// const passport = require('passport'),
//   localStrategy = require('passport-local').Strategy,
//   User = require('../sequelize'),
//   JWTstrategy = require('passport-jwt').Strategy,
//   ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use(
//   'register',
//   new localStrategy(
//     {
//     usernameField: 'username',
//     passwordField: 'password',
//     session: false,
//   },
//   (username, password, done) => {
//     try {
//       User.findOne({
//         where: {
//           username: username,
//         },
//       }).then(user => {
//         if(user !== null) {
//           console.log('Nom deja utilisé');
//           return done(null, false, { message: 'Nom deja utilisé'});
//         } else {
//           bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
//             User.create({ username, password: hashedPassword }).then(user => {
//               console.log(`Utilisateur created`);
//               return done(null, user);
//             });
//           });
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   },
//   ),
// );

// passport.use(
//   'login',
//   new localStrategy(
//     {
//     usernameField: 'username',
//     passwordField: 'password',
//     session: false,
//   },
//   (username, password, done) => {
//     try {
//       User.findOne({
//         where: {
//           username: username,
//         },
//       }).then(user => {
//         if(user !== null) {
//           console.log('Nom deja utilisé');
//           return done(null, false, { message: 'Mauvais nom'});
//         } else {
//           bcrypt.compare(password, user.password).then(response => {
//             if (!user) {
//               console.log('Mot de passe incorect');
//               return done(null, false, { message: 'Mot de passe incorect'});
//             }
//             console.log(`Utilisateur trouvé et connecté`);
//             return done(null, user);
//           });
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   },
//   ),
// );

// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
//   secretOrKey: jwtSecret.secret,
// };

// passport.use(
//   'jwt',
//   new JWTstrategy(opts, (jwt_payload, done) => {
//     try {
//       User.findOne({
//         where: {
//           username: jwt_payload.id,
//         },
//       }).then(user => {
//         if (user) {
//           console.log('Utilisateur trouvé dans le db et dans passport');
//           done(null, user);
//         } else {
//           console.log('Utilisateur introuvable dans le db');
//           done(null, user);
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   }),
// );