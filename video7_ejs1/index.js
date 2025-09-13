import express from "express";

const app = express();

app.set("view engine", "ejs") //tells express which template engine you are using here we using ejs engine for this views is a default folder

//if you change the folder  =>  app.set("views", "./folder_name")

app.get('/',(req,res)=>{
    res.send("<h1> running server </h1>")
})

app.get("/about",(req,res)=>{
    res.render('about',{vari:"kai"});
})


app.listen(3000, ()=>{
    console.log(`server is started on 3000`);
})