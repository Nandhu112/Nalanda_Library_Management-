import asyncHandler from "express-async-handler"
import Book from "../modles/bookModel.js"

const addNewBook = asyncHandler(async (req, res) => {
      const { title,author,ISBN,publicationDate,genre,copies } = req.body;
      const bookExist = await Book.findOne({ ISBN: ISBN });
      if (bookExist) {
        res.status(400);
        throw new Error("Book already exist");
      }
    
      const book = await Book.create({
        title,
        author,
        ISBN,
        publicationDate,
        genre,
        copies
      });
    
      if (book) {
        res.status(201).json({
          _id: book._id,
          title: book.title,
          author: book.author,
          ISBN: book.ISBN,
          publicationDate: book.publicationDate,
          genre: book.genre,
          copies: book.copies,
        });

      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    });

    const updateBook = asyncHandler (async(req,res)=>{
      console.log('chk updateBook');
      const book = await Book.findById(req.body._id)
      if(book){
        book.title=req.body.title || book.title
        book.author=req.body.author || book.author
        book.ISBN=req.body.ISBN || book.ISBN
        book.publicationDate=req.body.publicationDate || book.publicationDate
        book.genre=req.body.genre || book.genre
        book.copies=req.body.copies || book.copies
    
          const updatedBook=await book.save()
          res.status(200).json({
              _id:updatedBook._id,
              title:updatedBook.title,
              author:updatedBook.author,
              ISBN:updatedBook.ISBN,
              publicationDate:updatedBook.publicationDate,
              genre:updatedBook.genre,
              copies:updatedBook.copies,
           
          })
  
      }else{
          res.status(404)
          throw new Error('User Not Found') 
      }
      
     }) 

     const deleteBook = asyncHandler(async (req, res) => {
      try {
          console.log(req.params.id,'bookId')
        await Book.deleteOne({ _id: req.params.id});
        res
          .status(200)
          .json({ message: "Book Deleted Successfully", task: true });
      } catch (error) {
        console.log(error.message);
        res
          .status(404)
          .json({ message: "Book Delete Failed", task: false });
      }
    });

    const listBooks = asyncHandler(async (req, res) => {
      try {
        const books = await Book.find();
        res.status(201).json({ books});
      } catch (error) {
        res.status(404)
        .json({ message: "List Book Failed", task: false });
      }
    });

    export {
        addNewBook,
        updateBook,
        deleteBook,
        listBooks
    } 