const express = require("express");
const mongoose = require("mongoose");
const User = require("./Assignment-2/models/user");
const conn = require("./Assignment-2/conn");
const bodyParser = require('body-parser');
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const secret = "RESTAPI";
const jwt = require('jsonwebtoken');

conn();
const app = express();

app.use("/user", (req, res, next) => {
    console.log("Hello");
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(token);
    if(token){
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
               return res.status(403).json({
                status: "Failed",
                message: "Token is not valid"
                });
            }
            console.log("Hello I am here");
            req.user = decoded.data;
            next();
          });

    }else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})

app.use("/api/user", userRoutes);
app.use("/api/user", loginRoutes);
app.use("/api/user", postRoutes);

app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})


app.listen(5000, () => console.log("Our server is up and running at port 5000"));
