const {Schema, model} = require('mongoose');

const userSchema = Schema({
    picture:{type:String},
    name:{type:String, required:true},
    bio:{type:String},
    phone:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
},{
    versionKey:false,
})

const UserModel = model('user', userSchema);

module.exports = {
    UserModel
};