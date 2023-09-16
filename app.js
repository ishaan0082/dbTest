import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


// Connecting DataBase
mongoose.connect("mongodb+srv://ishaansahu210:Ishaan%40210@cluster0.acej7pv.mongodb.net/alumniTest", {useNewUrlParser: true,});


// Declaring Constants
const app = express();
const port = 3000;

// Using BodyParser
app.use(bodyParser.urlencoded({extended:true}));

// Creating Schema
const alumniSchema = new mongoose.Schema({
    RollNo: Number,
    Name: String,
    Branch: String,
    Email: String,
    Contact: Number
});

// Creating DB Model
const alumni = new mongoose.model("detail",alumniSchema);

// Creating variable for holding name
var Searchname;
app.post("/data",(req,res)=>{
    console.log(req.body.name);
    Searchname = req.body.name;
    res.redirect("/");
});

app.get("/",(req,res)=>{
    alumni.find({Name: Searchname})
    .then(details =>{
        res.render("index.ejs", {array: details});
        console.log(details);
    })
    .catch(err=>{
        console.log(err);
    })
    // res.render("index.ejs");
});

const alum = new alumni({
    RollNo: 123,
    Name: 'is',
    Branch: 'is',
    Email: 'is',
    Contact: 1000
});
alum.save();

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
});