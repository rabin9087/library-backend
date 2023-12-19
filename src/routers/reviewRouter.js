import express from 'express'
import { updateBurrow } from '../models/burrow/BurrowModel.js'
import { newReviewValidation } from '../middleware/joiValidation.js';
import { adminAuth, userAuth } from '../middleware/authMiddleware.js';
import { createReview, deleteReview, getManyReview } from '../models/review/ReviewModel.js';
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        // const { role, _id } = req.userInfo;

        //if admin makes request, return all the burrow history, if logged in user make requests then
        //return their burrow only based on th euserId in burrow table

        const reviews = await getManyReview()

        res.json({
            status: "success",
            message: 'Here is the list of reviews',
            reviews,
        })


    } catch (error) {
        next(error)

    }
})

router.post("/", userAuth, newReviewValidation, async (req, res, next) => {
    try {
        const userId = req.userInfo._id
        const result = await createReview({ ...req.body, userId })

        if (result?._id) {

            //update burrow table and add review id to the burrorhistory

            await updateBurrow({ _id: req.body.burrowHistoryId }, { reviewGiven: result._id })
            return res.json({
                status: "success",
                message: 'you have successfully reviewed the book. Admin will verify your review soon '
            })
        }
        return res.json({
            status: "error",
            message: "Unable to process your review, please try again later"
        })


    } catch (error) {
        next(error)

    }
})

router.delete("/:_id", adminAuth, async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { status } = req.body;

        if (['active. inactive'].includes(status)) {
            const result = await updateReview({ _id }, { status })

            if (result?._id) {

                return res.json({
                    status: "success",
                    message: "The review has been updated. Thank you!",
                })
            }
        }

        res.json({
            status: "error",
            message: "Something went wrong! Please contact administration"
            , result, userId,
            _id
        })

    } catch (error) {
        next(error)
    }
})

router.patch("/:_id", adminAuth, async (req, res, next) => {
    try {
        const { _id } = req.params;
        const result = await deleteReview();

        if (result?._id) {

            return res.json({
                status: "success",
                message: "The review has been deleted. Thank you!",
            })

        }

        res.json({
            status: "error",
            message: "Something went wrong! Please contact administration"
            , result, userId,
            _id
        })

    } catch (error) {
        next(error)
    }
})

export default router;