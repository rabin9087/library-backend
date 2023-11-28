import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'active',
    },
    role: {
        type: String,
        default: 'student'
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: 1,
    },
    phone: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model("User", userSchema) //users