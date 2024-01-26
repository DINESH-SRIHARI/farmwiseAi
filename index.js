const express=require('express')
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());


require('./db/connection')


//login& signup

const newuser=require('./Routes/userroutes')
app.use(newuser)
const loginuser=require('./Routes/loginrouter')
app.use(loginuser)

//adding new book
const addbook=require('./Routes/addbook')
app.use(addbook)

//finding all books
const allbooks=require('./Routes/allbooks')
app.use(allbooks)

//finding a book based on ISBN 
const getbook=require('./Routes/getbook')
app.use(getbook)

//updating book 
const updatebook=require('./Routes/update')
app.use(updatebook)

//deleting book
const deletebook=require('./Routes/delete')
app.use(deletebook)

//   let Booksschma=new Schema({
//         Title:String,
//         Author:String,
//         ISBN:String,
//         price:Number,
//         quantity:Number
//   })
// const Books=mongoose.model('books',Booksschma)
// app.post('/addbook',(req,res)=>{
//     try {
//         const newBook = new Books({
//             Title:req.body.title,
//             Author:req.body.Author,
//             ISBN:req.body.ISBN,
//             price:req.body.price,
//             quantity:req.body.quantity
//         });
    
//         newBook.save();
//         res.status(201).json({success: true, message: 'New Book Added successfully', book: newBook });
//       } catch (error) {
//         console.error("Error saving user:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// })
// app.post('/allbooks',async(req,res)=>{
//     try {
//         const AllBooks = await Books.find();
//         res.status(201).json({success: true,  message: 'All books fetched successfully', books: AllBooks });
//       } catch (error) {
//         console.error("Error saving user:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// })
// app.post('/getbook',async(req,res)=>{
//     try {
//         const ISBNBook = await Books.findOne({ISBN:req.body.ISBN});
//         res.status(201).json({success: true,  message: 'All books fetched successfully', book: ISBNBook });
//       } catch (error) {
//         console.error("Error saving user:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// })
// app.post('/update/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//       const updatedBook = await Books.findOneAndUpdate(
//         { _id: id },
//         {
//           $set: {
//             Title: req.body.title,
//             Author: req.body.Author,
//             ISBN: req.body.ISBN,
//             price: req.body.price,
//             quantity: req.body.quantity
//           }
//         },
//         { new: true } 
//       );
  
//       if (!updatedBook) {
//         return res.status(404).json({ success: false, message: 'Book not found' });
//       }
  
//       res.status(200).json({ success: true, message: 'Book updated successfully', book: updatedBook });
//     } catch (error) {
//       console.error("Error updating book:", error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   });
  

//   app.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const deletedbook = await Books.findByIdAndDelete(id);
  
//       if (!deletedbook) {
//         return res.status(404).json({ success: false, message: 'Document not found' });
//       }
  
//       res.json({ success: true, message: 'Document deleted successfully', data: deletedbook });
//     } catch (error) {
//       console.error('Error deleting document:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });



app.listen('5100',()=>{
    console.log('it is running')
})