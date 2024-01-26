const express=require('express')

const router=express.Router()
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const Books=require('../model/booksschema')
router.post('/addbook',(req,res)=>{
    try {
        const newBook = new Books({
            Title:req.body.title,
            Author:req.body.Author,
            ISBN:req.body.ISBN,
            price:req.body.price,
            quantity:req.body.quantity
        });
    
        newBook.save();
        res.status(201).json({success: true, message: 'New Book Added successfully', book: newBook });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

module.exports=router