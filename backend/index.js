const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const jobRoutes = require('./Routes/JobRoutes');

const app = express();  //represents express application

mongoose
.connect(MONGO_URL, {

})
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=> console.error(err));

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
})

app.use(
    cors({
      origin: ["http://localhost:3000"],          //allows req from this port only
      methods: ["GET", "POST", "PUT", "DELETE"],  //allows http req
      credentials: true,                         //allows cookies and credentials to be sent with requests
    })
  );
  app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});


  app.use(cookieParser());

  app.use(express.json());      //middleware function which parses json correctly, req.body will allow you to access this data

  app.use('/', authRoute);

  // const jobRoutes = require('./Routes/JobRoutes');
  app.use('/jobs', jobRoutes);
