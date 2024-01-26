const mongoose=require('mongoose')
const { Schema } = mongoose;
let Booksschma=new Schema({
    Title:String,
    Author:String,
    ISBN:String,
    price:Number,
    quantity:Number
})
const Books=mongoose.model('books',Booksschma)
module.exports=Books;