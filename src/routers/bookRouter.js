import express from 'express'
import { createBook, getAllBooks } from '../models/books/BookModel.js'
import { userAuth } from '../middleware/authMiddleware.js';
import { newBookValidation } from '../middleware/joiValidation.js';
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const books = await getAllBooks();
        res.json({
            status: "success",
            message: "User info are",
            books,
        })
    } catch (error) {
        next(error)
    }
})

router.post("/", userAuth, newBookValidation, async (req, res, next) => {
    try {
        if (req.userInfo.role !== "admin") {
            throw new Error("You do not have permission to this page")
        }
        const books = await createBook(req.body);

        books?._id ?
            res.json({
                status: "success",
                message: "New book has been added successfully",
                books,
            }) :
            res.json({
                status: "error",
                message: "Unable to add new book, please try again",
                books,
            })

    } catch (error) {
        console.log(error.message)
        if(error.message.includes("E11000 dublicate key error")){
            error.message = "There is another book that has similar ISBN. Please change ISBN and try again"
            error.errorCode = 200;
        }

        next(error)
    }
})

export default router;