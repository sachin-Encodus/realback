const jwt = require("jsonwebtoken");

const User = require("../models/user"); 


const auth = async(req, res , next ) => {
    try {
       // verifyUser for authentication any pages
         const token = req.Cookie.jwt;
    const verifyUser =  jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
     


    // verifyUser for get data any pages
     const user = await  User.findOne({_id:verifyUser._id});
     console.log(user.firstname);
     
       req.token = token;
       req.user = user;


    next();

    } catch (error) {
      
       res.status(400).render('signup') ;
    }


}


module.exports = auth;