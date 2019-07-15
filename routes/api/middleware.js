let jwt = require('jwt-simple');
let config = require('../../config');
let moment = require('moment');

exports.checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: 'Tu petición no dispone de la cabecera de autorización' });
  }
  let token = req.headers.authorization;
  let body = jwt.decode(token, config.TOKEN_SECRET);

  console.log(body);

  if (body.expires <= moment().unix()) {
    return res.status(403).json({ message: 'El token ha expirado' });
  }

  req.user = body.userId;

  next();
}