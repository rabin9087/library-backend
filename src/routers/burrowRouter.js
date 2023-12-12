import express from 'express'
import { createBurrow, getManyBurrow } from '../models/burrow/BurrowModel.js'
import { newBurrowValidation } from '../middleware/joiValidation.js';
import { updateBookById } from '../models/books/BookModel.js';
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {

        const { role, _id } = req.userInfo;

        //if admin makes request, return all the burrow history, if logged in user make requests then
        //return their burrow only based on th euserId in burrow table

        const burrows = role === "admin" ? await getManyBurrow() : await getManyBurrow({ userId: _id })
        result.length ?
            res.json({
                status: "success",
                message: 'Here is the list of burrow history',
                burrows
            }) :
            res.json({
                status: "error",
                message: 'Unable to burrow this book, please contact adminstration'
            })

    } catch (error) {
        next(error)

    }
})

router.post("/", newBurrowValidation, async (req, res, next) => {
    try {
        let numberOfDaysToReturn = 15
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + numberOfDaysToReturn)
        const result = await createBurrow({ ...req.body, dueDate })

        if (result?._id) {

            await updateBookById({
                _id: req.body.bookId,
                isAvailable: false,
                dueDate
            })
            return res.json({
                status: "success",
                message: 'you have successfully burrowed this book, you can check your burrow history to find this information'
            })
        }
        return res.json({
            status: "error",
            message: "Unable to burrow the book, please contact administration"
        })


    } catch (error) {
        next(error)

    }
})

export default router;