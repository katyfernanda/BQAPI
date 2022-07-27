// const { expressjwt } = require("express-jwt");
// const jwt = require('jsonwebtoken');
// require("dotenv").config();
// const User = require('../models/users')

// const SECRET = process.env.SECRET

// app.use(
//   expressjwt({
//     secret: SECRET,
//     algorithms: ["HS256"],
//   }).unless({ path: ["/auth"] }) 
// );

// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).send("Token inválido");
//   } else {
//     next(err);
//   }
// });

// const token = req.headers.authorization.replace('Bearer ', (''))

// const decoded = jwt.verify(token, SECRET);


// module.exports = (secret) => (req, resp, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return next();
//   }

//   const [type, token] = authorization.split(' ');

//   if (type.toLowerCase() !== 'bearer') {
//     return next();
//   }

//   jwt.verify(token, secret, (err, decodedToken) => {
//     if (err) {
//       return next(403);
//     }

//     // TODO: Verificar identidad del usuario usando `decodeToken.uid`
//   });
// };

// module.exports.isAuthenticated = (req) => (
//   // TODO: decidir por la informacion del request si la usuaria esta autenticada
//   false
// );

// module.exports.isAdmin = (req) => (
//   // TODO: decidir por la informacion del request si la usuaria es admin
//   false
// );

// module.exports.requireAuth = (req, resp, next) => (
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : next()
// );

// module.exports.requireAdmin = (req, resp, next) => (
//   // eslint-disable-next-line no-nested-ternary
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : (!module.exports.isAdmin(req))
//       ? next(403)
//       : next()
// );