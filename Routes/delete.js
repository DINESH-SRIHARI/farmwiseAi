const express=require('express')
const router=express.Router()
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const Books=require('../model/booksschema')
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedbook = await Books.findByIdAndDelete(id);
  
      if (!deletedbook) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }
  
      res.json({ success: true, message: 'Document deleted successfully', data: deletedbook });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports=router