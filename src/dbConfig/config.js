import mongoose from 'mongoose'

export const connectDb = () => {
    try {
        const connect = mongoose.connect(process.env.MONGO_URL);
        connect && console.log("Mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}