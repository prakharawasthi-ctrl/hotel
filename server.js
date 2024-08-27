const express=require('express');

const app = express();

const db = require('./db');

const Person = require('./models/Person');

const bodyParser = require('body-parser');

app.use(bodyParser.json());//req.body

app.get('/',function(res,req){
    res.send('Welcome to my hotel.');
})


// Import the router files

const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuItemsRoutes);
app.listen(3000,()=>{
    console.log('listening on port 3000')
});
  