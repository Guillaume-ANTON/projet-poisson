import User from '../sequelize';
import jwtSecret from '../config/jwt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

module.exports = app => {
  app.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
            User.finOne({
              where: {
                username: user.username,
              },
            }).then(user => {
              const token = jwt.sign({ id: user.username }, jwtSecret.secret);
              res.status(200).send({
                auth: true,
                token: true,
                message: 'Utilisateur trouvé et connecté',
              });
            });
        });
      }
    })(req, res, next);
  });
}