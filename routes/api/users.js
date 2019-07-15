var express = require('express');
var router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

let config = require('../../config');
let User = require('../../models/user');

router.post('/signup', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    res.json(user);
  })
})

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err || !user) {
      return res.json({ error: 'Usuario y/o contraseña erróneos' });
    } else {
      let eq = bcrypt.compareSync(req.body.password, user.password);
      if (eq) {
        res.json({ token: creaToken(user) });
      } else {
        res.json({ error: 'Usuario y/o contraseña erróneos' });
      }
    }
  })
})

// Creamos una función para generar el token
let creaToken = (user) => {
  let body = {
    userId: user._id,
    create: moment().unix(),
    expires: moment().add(10, "minutes").unix()
  }
  return jwt.encode(body, config.TOKEN_SECRET);
}

module.exports = router;