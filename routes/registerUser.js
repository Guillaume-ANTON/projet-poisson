import User from '../sequelize';
import passport from 'passport';
import { equal } from 'assert';

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
          };
          User.finOne({
            where: {
              username: data.username,
            },
          }).then(user => {
            user.update({
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
            }).then(() => {
              console.log('Utilisateur créé dans la db');
              res.status(200).send({ message: 'Utilisateur crée'});
            });
          });
        });
      }
    })(req, res, next);
  });
};