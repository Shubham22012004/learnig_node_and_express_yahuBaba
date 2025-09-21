/*
storing session at server
*/

import express from 'express';

const app = express();
import session from 'express-session';

//middleware of session
app.use(session({
    secret:"any_Value",
    resave:false,
    saveUnitialized : false,
    cookie:{maxAge:1000*60*60*24}
}))

app.get('/',(req,res)=>{
    res.send("<h1>no session created yet</h1>");
})

//session creation 
/*
this session is fromed  at system RAM, but the RAM has less capacity so most developer try to save it in mongoDB or other DB using package ''connect-mongo'' to reduce the overhead at server
*/

app.get('/set-session', (req,res)=>{
    req.session.any_key = "world"; //by default session value store for 24 hrs
    res.send("<h1>  session created </h1>")
})

//read session at server -> we can read the session value at any page or any route
app.get('/get-session',(req,res)=>{
    if(req.session.any_key){
        res.send(`<h1> username from session is :${req.session.any_key}`);
    }else{
        res.send("no session value founnd");
    }
})

//destroy session

app.get('/destroy',(req,res)=>{
    
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('failed to destroy session');
        }
        res.send('session destroy successfully');
    })
})

app.listen(5000,()=>{
    console.log(`server is running on 5000`)
})