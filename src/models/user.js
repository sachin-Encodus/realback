const mongoose = require('mongoose');
// personal detailes  schema
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY} = require('../../config/keys')
const UserSchema = new mongoose.Schema({

   
name:{
      type:String,
      required:true,
    

   },

      
     email:{
      type:String,
      required:true,
      unique:true
      
   },

   password:{
       type:String,
       required:true
   },

   role: {
      type: String,
      default: 'user'
    },


    resetPasswordLink: {
      data: String,
      default: ''
    },

tokens:[{
         
      token:{
         type:String,
         required:true
      }

   }]
   
 
});


//  generating token
   UserSchema.methods.generateAuthToken = async function(){
      try {
         console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},  SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
  
      } catch (error) {
         res.send("the error part  "   + error);
         console.log("the error part" + error);
      }
   }



   // bcrypt passwordHash secure]
UserSchema.pre("save", async function(next){

        if(this.isModified("password")){
        
           this.password  = await bcrypt.hash( this.password, 10);  
   }
next();
})



// now we create to a Collection
 const User = new mongoose.model("User",  UserSchema);

module.exports = User;
