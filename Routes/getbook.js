const express=require('express')

const router=express.Router()
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const Books=require('../model/booksschema')
router.post('/getbook',async(req,res)=>{
    try {
        const ISBNBook = await Books.findOne({ISBN:req.body.ISBN});
        res.status(201).json({success: true,  message: 'All books fetched successfully', book: ISBNBook });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

module.exports=router