const mongoose=require('mongoose')
const { Schema } = mongoose;
const User=new Schema(
    {
        name:String,
        email:String,
        password:String
    }
)
const user=mongoose.model('users',User)
module.exports=user;