const express=require('express')

const router=express.Router()
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const Books=require('../model/booksschema')
router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
      const updatedBook = await Books.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            Title: req.body.title,
            Author: req.body.Author,
            ISBN: req.body.ISBN,
            price: req.body.price,
            quantity: req.body.quantity
          }
        },
        { new: true } 
      );
  
      if (!updatedBook) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
  
      res.status(200).json({ success: true, message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

module.exports=router