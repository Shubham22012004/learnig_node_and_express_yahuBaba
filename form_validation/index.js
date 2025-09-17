import express from 'express';

const app = express();
import  {body, validationResult } from 'express-validator'; //body and validationResutl are the method define in express-validator

app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

var validationRegistraion = [
    //get the filed from form.ejs on which you want to apply validation and use it as middleware

    body('name').notEmpty().withMessage("name is required").isLength({min:5}).withMessage("name must be of length greater tha 5"),
    body('age').isInt({gt:18}).withMessage("age should greater than 18"),
    body('email').isEmail().withMessage("write a correct email"),
    body('city'),
    body('password').isLength({min:5, max:15}).withMessage("must be greater than 5")
]

app.get('/',(req,res)=>{
    res.render('form');
})


app.post('/submit-form',validationRegistraion,(req,res)=>{
    const error = validationResult(req); //validationResult is a method of express-validator
    if(error.isEmpty()){
        res.send(req.body);
    }else{
        res.send(error);
    }
})


app.listen(5000,()=>{
    console.log('server is running on 5000');
})