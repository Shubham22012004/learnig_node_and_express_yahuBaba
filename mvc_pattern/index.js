import express from 'express';
import mongoose from 'mongoose';
import  connectDB  from './config/db.js' 
import router from  './routes/routes.js'
const app = express();

app.set('view engine', "ejs")
app.use(express.urlencoded({extended:true})) //using form data
app.use(express.static("public")) //static file
// app.use(express.json())

connectDB();

app.use(router);

app.listen(3000,()=>{
    console.log('server is running on 3000');
})


