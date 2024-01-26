const mongoose=require('mongoose')
mongoose
  .connect("mongodb+srv://farmwiswAi:Asdfg123@cluster0.yfkwxvb.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });