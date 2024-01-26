const express=require('express')
const router=express.Router()
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const Books=require('../model/booksschema')
router.post('/allbooks',async(req,res)=>{
    try {
        const AllBooks = await Books.find();
        res.status(201).json({success: true,  message: 'All books fetched successfully', books: AllBooks });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})
module.exports=router