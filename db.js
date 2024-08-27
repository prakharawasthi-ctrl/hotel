const mongoose = require('mongoose');
// define the MongoDB connection URL
const mongoURL='mongodb://localhost:27017/hotels'// Replace 'mydatabase' with your database name

// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// Get the default connection 
// Mongoose maintains a default connection object representing the 
// MongoDB connection
const db = mongoose.connection;
// Define event listener for database connection

db.on('connected',()=>{
    console.log('connected to MongoDb server');
});

db.on('error',(err)=>{
    console.error('MongoDB connection errror:',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

// Export the database connection 

module.exports = db;
