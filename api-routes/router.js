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
    model.find({}).then((prodcuts) => {
        res.json(prodcuts);
    }).catch((err) => next(err));
})

router.post('/addProduct', (req, res, next) => {
    console.log(req.body);
    model.insertMany(req.body).then((productData) => {
        res.json(productData);
    }).catch((err) => next(err));
})

router.put('/editProductDetail', (req, res, next) => {
    console.log(req.body);
    model.findByIdAndUpdate(req.body._id, req.body).then((updatedData) => {
        res.json(updatedData);
    }).catch((err) => next(err));
})

router.delete('/deleteProduct', (req, res, next) => {
    model.findByIdAndRemove(req.query.productId).then((updatedData) => {
        res.json(updatedData);
    }).catch((err) => next(err));
})

router.get('/productDetail', (req, res, next) => {
    model.findById(req.query.productId).then((productData) => {
        res.json(productData);
    }).catch((err) => next(err));
})

module.exports = router;