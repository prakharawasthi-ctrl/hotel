const express=require('express');

const app = express();

const db = require('./db');

const Person = require('./models/Person');

const bodyParser = require('body-parser');

const passport = require('passport');

const LocalStrategy=require('passport-local').Strategy;
// here most of the things are middleware 
app.use(bodyParser.json());//req.body
//this body parser is also a type of middleware


// Middleware Function 
const logRequest = (req,res,next)=>{
   console.log(`[${new Date().toLocaleString()}] Request Mode to:${req.originalUrl}`);
   next();//Move on to the next phase
//    it gives signal to server that our current middleware function
//    is ended and its time to move to sever part
}
app.use(logRequest);//this is a middleware

passport.use(new LocalStrategy(
async(username,password,done)=>{
    // authentication logic is here 
    try{
        console.log('Recived credentials',username,password);
        const user =await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Incorrect username.'});
        }
        const isPasswordMatch = user.password === password ? true:false;
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'Incorrect password.'});
        }
    }
    catch(err){
        return done(err);
    }
}));

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/',function(req, res) {  // Corrected parameter order
    res.send('Welcome to my hotel.');
}); 


// Import the router files
const PORT=process.env.PORT||3000
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemRoutes');

app.use('/person',personRoutes);//this is also a middleware
app.use('/menu',localAuthMiddleware,menuItemsRoutes);//this is also a middleware

app.listen(3000,()=>{
    console.log('listening on port 3000')
});
// it is a way to add some extra functionality to your application's 
// request response cycle

// comment added for testing purpose