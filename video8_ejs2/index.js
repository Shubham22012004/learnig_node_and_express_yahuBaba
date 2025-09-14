import express from 'express';
import mongoose from 'mongoose';
import {Contact} from './models/contact.models.js';
const app = express();

app.set('view engine', "ejs")
app.use(express.urlencoded({extended:true})) //using form data
app.use(express.static("public")) //static file
// app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/contact-app')
.then(console.log("db connected sucdessfully"))
.catch(err => console.error("DB connection error:", err));

//routes

app.get('/', async (req,res)=>{ 
    const cont = await Contact.find();
    // res.json(cont);
    res.render('home',{contacts:cont}); //contacts name must be same in template
})


//show data of single contact - eye 
app.get('/show-contact/:id', async (req,res)=> {
    const cont = await Contact.findById({_id: req.params.id}); //req.params is use to take valiue for above query


    res.render('show-contact', {contact:cont}) 
    /*if the template var and here var is same then you can single paratmeter = {cont} if you do so then in ejs file you have to use cont

    but currently you are using another var called "contact" so use "contact" in ejs file
    */
})

app.get('/add-contact', (req,res)=>{ res.render('add-contact')})

//for submit the form
app.post('/add-contact', async (req,res)=>{
    
    // res.send("contact add successfully");
    await Contact.create(req.body);
    res.redirect("/");
})


app.get('/update-contact/:id', async (req,res)=>{ 
    const contact = await Contact.findById(req.params.id);

    res.render('update-contact',{contact})

})

app.post('/update-contact/:id', async (req,res)=>{
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
})

app.delete('/delete-contact/:id', (req,res)=>{})


app.listen(3000,()=>{
    console.log('server is running on 3000');
})


