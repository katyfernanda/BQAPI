// const { expressjwt } = require("express-jwt");
// const express = require("express");
// const app = express();


// const middlewareUser = () => {
//     const handleAuthenticationMiddleware = (req, res, next) => {
//         console.log("req.auth:", req.auth)
//         next()
//     }
//     app.use(
//         expressjwt({
//             secret: process.env.SECRET, algorithms: ["HS256"],
//         }).unless({ path: ["/auth"] }),
//         handleAuthenticationMiddleware
//     )

//     app.use(function (err, req, res, next) {
//         console.log("unuthorized middleware err:", err)
//         if (err.name === "UnauthorizedError") {
//             console.log(err)
//             res.status(401).send("Token inválido");

//         } else {
//             next(err);
//         }
//         next(err)
//     });
// }

// module.exports = middlewareUser





