// app.get('/orders', (req, res) => {
//     const token = req.headers.authorization.replace('Bearer ',(''))
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET);
//         console.log(decoded)
//         return res.json({
//             decoded
//         })
//     } catch (err) {
//         return res.json({
//             message: 'papasquema'
//         })
//     }
// })