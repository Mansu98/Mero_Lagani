const express = require("express");
const mongoose = require("mongoose");
const apinews = require("./dbapinews.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/MeroLagani",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: true
}).then (()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("Connection Unsuccessful");

})


app.get("/", (req,res)=>
    res.status(200).send("Check the API in Postman or Insomiac")
);
// Create a news article
app.post("/api/news",(req,res)=>{
    const dbapi = req.body;
    apinews.create(dbapi,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})

// Read news by id
app.get("/api/news/:id",(req,res)=>{

    apinews.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})

// Read all the news
app.get("/api/news",(req,res)=>{

    apinews.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})


// Update a article by id

        app.patch("/:id",(req,res)=>{
            apinews.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
       .then((apinews) => {
           if (!apinews) {
              return res.status(404).send();
           }
           res.send({apinews});
       }).catch((e) => {
              res.status(400).send();
       })
    })


        //     apinews.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:true},(err,data)=>{
        //         if(err){
        //             res.status(500).send(err)
        //         }
        //             else{
        //                 res.status(201).send(data)
        //             }
        //         }
        //     )
        // })
        

// Delete a article by id
app.delete("/:id",(req,res)=>{

    apinews.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})



app.listen(port,()=>{
    console.log(`server is connected at port :${port}`)
})
