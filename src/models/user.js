const mongoose = require('mongoose');
// personal detailes  schema
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY} = require('../../config/keys')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  subscriber: [
    {
      email: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },

      number: {
        type: Number,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      adhar: {
        type: Number,
        required: true,
      },

      pancard: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      Address: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      expiredate: {
        type: String,
      },
    },
  ],

  resetPasswordLink: {
    data: String,
    default: "",
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//  generating token
UserSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign({ _id: this._id.toString() }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part  " + error);
    console.log("the error part" + error);
  }
};

UserSchema.methods.addPro = async function (
  email,
  name,
  adhar,
  pancard,

  number,
  status,

  country,
  state,
  city,
  pincode,
  Address,
  expiredate
) {
  console.log(
    "==================>>>>>>>>>>",
    email,
    name,
    adhar,
    pancard,

    number,
    status,

    country,
    state,
    city,
    pincode,
    Address,
    expiredate
  );

  try {
    this.subscriber = this.subscriber.concat({
      email,
      name,
      adhar,
      pancard,

      number,
      status,

      country,
      state,
      city,
      pincode,
      Address,
      expiredate,
    });
    await this.save();
    return this.subscriber;
  } catch (error) {
    console.log("the error part" + error);
  }
};

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
