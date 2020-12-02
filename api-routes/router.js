const express = require('express');
const router = express.Router();
var model = require('../api-model/model');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[2];
        jwt.verify(token, 'Yoursecret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    if (req.body.email == "admin" && req.body.password == "admin") {
        var token = jwt.sign({
            data: req.body.email
        }, "Yoursecret");
        var user = {
            success: true,
            token: 'jwt ' + token,
            user: req.body.email
        }
        res.json(user);
    }
})

router.get('/productData', authenticateJWT, (req, res, next) => {
    console.log(req);
    console.log("after jwt authorization");
    model.find({}, { _id: 0 }).then((prodcuts) => {
        res.json(prodcuts);
    })
})

module.exports = router;