//load env variable from .env files
require("dotenv").config();

// import express framework
const express = require("express")
const connectDB = require("./config/db");

//create a express app
const app = express();

const weatherRoutes = require("./weatherRoutes");

//connect databse

connectDB();

// Middleware to parse JSON data
app.use(express.json());

// Default Route for weather routes
app.use("/", weatherRoutes);

// Start Server on Port 5000
app.listen(5000, ()=> {
    console.log("Server running on http://localhost:5000");
})

//Bhaksar