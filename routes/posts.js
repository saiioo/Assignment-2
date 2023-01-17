const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const Blog = require("../Assignment-2/models/blogs");

const router = express.Router();
router.use(bodyParser.json());


router.post("/posts", async (req, res) => {
    try{
        console.log("I m in create posts");
        console.log(req.body);
        console.log(req.user);

        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            user: req.user
        });

        res.json({
            status: "Success",
            blog
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});

router.get("/posts", async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.json({
            status: "Success",
            blogs
        })

    }catch(e){
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;