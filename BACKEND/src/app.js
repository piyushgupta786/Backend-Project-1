const express = require('express');
const multer = require('multer');
const postModel = require('./models/post.model');
const uplaodfile = require("./services/storage.service");
const cors = require("cors");


const app = express();
const uplaod = multer({ storage:multer.memoryStorage()})

app.use(cors());
app.use(express.json());

app.post('/create-post' ,uplaod.single('image'), async (req,res) =>{

    console.log(req.body)
    console.log(req.file)
    const buffer = req.file.buffer;
    
    const result = await uplaodfile(buffer)

    const post =  await postModel.create({
        image: result.url,
        caption: req.body.caption

    }) 

      return res.status(201).json({
        message : "post uplaoded successfully",
        post
      })

})

app.get("/posts", async (req,res)=> {

    const posts = await postModel.find()

     return res.status(200).json({
        message :"post fetched successfully",posts
    })
})

module.exports = app;