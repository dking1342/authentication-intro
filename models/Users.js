
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('express-jwt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email:String,
    hash:String,
    salt:String,
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
    return this.hash === hash;
}

return jwt.sign({
    email:this.email,
    id:this._id,
    exp:parseInt(expirationDate.getTime() / 1000, 10),
}, 'secret');

UserSchema.methods.toAuthJSON = function(){
    return{
        _id:this._id,
        email:this.email,
        token:this.generateJWT(),
    }
}

mongoose.model('User',UserSchema);