import passport from 'passport';

module.exports = app => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', {session: false }, (err, user, info) => {
      if(err) {
        console.log(err);
      }
      if(info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log("Utilisateur trouvé dans la db");
        res.status(200).send({
          auth: true,
          first_name:user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          password: user.password,
          message: 'Utilisateur trouvé dans la db'
        })
      }
    })(req, res, next)
  })
}