import express from 'express'
import { createBook, deleteBook, getABook, getAllBooks, getBookById, updateBookById } from '../models/books/BookModel.js'
import { adminAuth, getUserFromAccessJWT, userAuth } from '../middleware/authMiddleware.js';
import { newBookValidation, updateBookValidation } from '../middleware/joiValidation.js';
const router = express.Router()

router.get("/:_id?", async (req, res, next) => {
    try {
        const {authorization} = req.headers
        let filter = {status: "active"}
        if(authorization) {
            const user = await getUserFromAccessJWT(authorization);
            if(user?.role === "admin"){
                filter = {}
            }
        }
       
        const { _id } = req.params
        const books = _id ? await getABook({...filter, _id}) : await getAllBooks(filter);
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
        if (error.message.includes("E11000 dublicate key error")) {
            error.message = "There is another book that has similar ISBN. Please change ISBN and try again"
            error.errorCode = 200;
        }

        next(error)
    }
})

router.put("/", adminAuth, updateBookValidation, async (req, res, next) => {
    try {

        const books = await updateBookById(req.body);

        books?._id ?
            res.json({
                status: "success",
                message: "The book has been updated successfully",
                books,
            }) :
            res.json({
                status: "error",
                message: "Unable to update the book, please try again",
                books,
            })

    } catch (error) {
        next(error)
    }
})

router.delete("/:_id", adminAuth, async (req, res, next) => {
    try {
        const {_id} = req.params
        const books = await deleteBook(_id);

        books?._id ?
            res.json({
                status: "success",
                message: "The book has been deleted successfully",
                books,
            }) :
            res.json({
                status: "error",
                message: "Unable to delete the book, please try again",
                books,
            })

    } catch (error) {

        next(error)
    }
})
export default router;