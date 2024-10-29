const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
    Dob:{
        type: String,
    },
    gender:{
        type: String,
    },

    employ:{
        type: String,
    },
    account:{
        type: String,
    },
    address:{
        type: String,
    },
    aptNo:{
        type: Number,
    },
    country:{
        type: String
    },
    region:{
        type: String
    },
    pin:{
        type: Number,
    },
    username:{
        type: String
    },
    idType:{
     type: String
    },
    Gov_id:{
    type: String
    },
    tel:{
        type: String,
    },
    password:{
        type: String,
    },
    image:{
        type: String,
    },
    accNo:{
        type: String,
        default: "Loading"
    }, 
    balance:{
        type: Number,
        default: 0
    },
    V_code:{
        type: Number,
        default: 0
    },
    txn_code_01:{
        type: Number,
        default: 0
    },
    nkFullname:{
        type: String
    },
    nktel:{
        type: String
    },
    nkRe:{
        type: String
    },
    nknkaddress:{
        type: String
    },
    transfers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'transferMoney'
    },
    
    upgrades: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'upgrade'
    },

  
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
