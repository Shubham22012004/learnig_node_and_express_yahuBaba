import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import reg_model from './model/user.model.js';


mongoose.connect('mongodb://127.0.0.1/auth-test')
.then(console.log("DB connected"))



const app = express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('this is home page');
})

app.get('/login',(req,res)=>{
    res.render('login');

})

app.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    let user =await reg_model.findOne({email});
    // res.send(user);
    let hashedPassword = user.password;
    
    if(await bcrypt.compare(password, hashedPassword)){
        res.send("user login successfull");
    }else{
        res.error('login user failed');
    }
})

app.get('/register',(req,res)=>{
    res.render('registration');
})

app.post('/register', async (req,res)=>{
    const {name, email,  password, confirmPassword} = req.body;
    let hashedPassword = '';
    if(password == confirmPassword){
        hashedPassword = await bcrypt.hash(password,10); //hash function is an async fun
        
    }

    await reg_model.create({name,email,password:hashedPassword});
    res.send({email, password : hashedPassword});
})


app.listen(5000,(req,res)=>{
    console.log('server is running on the 5000');
})