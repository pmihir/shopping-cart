var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var router = require("./api-routes/router");
mongoose.promise = global.promise;
var connectionUrl = "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/Test?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
app.listen(3000);
console.log("Server listening on port 3000");