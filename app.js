require('dotenv').config();
const express = require('express');              
const app  = express();              
const path = require('path');               

 

const cors = require('cors');
const port = process.env.PORT || 5000;  
const morgan = require('morgan')
require("./src/db/conn");                       

const cookieParser = require('cookie-parser');

// const static_path = path.join(__dirname, "../public");

// app.use(express.static(static_path));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


        

const authRoutes = require('./src/routes/auth.route')
const userRouter = require('./src/routes/user.route')
app.use('/api', authRoutes);
app.use('/api', userRouter)




// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder

// app.use(express.static(path.join(__dirname, 'client/build')));

// const authRoutes = require('./src/routes/auth.route')
// const userRouter = require('./src/routes/user.route')
// app.use('/api', authRoutes);
// app.use('/api', userRouter)

//   app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + 'client/build/index.html'));
//   });
// }else{

// const authRoutes = require('./src/routes/auth.route')
// const userRouter = require('./src/routes/user.route')
// app.use('/api', authRoutes);
// app.use('/api', userRouter)


// }






app.listen( port , () => {
     console.log(`listenig the port at ${port}`);       
})