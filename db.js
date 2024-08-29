const mongoose = require('mongoose');
require('dotenv').config();
// define the MongoDB connection URL
const mongoURL=process.env.DB_URL// Replace 'mydatabase' with your database name
// const mongoURL='mongodb+srv://prakharawasthi302002:abc123@cluster0hotel.e5p3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0hotel'
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
