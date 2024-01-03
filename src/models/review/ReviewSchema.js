import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive"
    },
    burrowHistoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    bookName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 5,
    },

}, {
    timestamps: true,
})

export default mongoose.model("Review", reviewSchema) //Review