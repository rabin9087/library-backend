import 'dotenv/config'
import express from "express";
import cors from 'cors'
import morgan from 'morgan';
import userRouter from './src/routers/userRouter.js';
import { connectDb } from './src/dbConfig/config.js';
const app = express();
const PORT = process.env.PORT || 8000;

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan());

//Db connection
connectDb();

//api endpoints
app.use("/api/v1/users", userRouter)

app.use("/", (req, res) => {
    res.json({
        status: "success",
        message: "Server is running well"
    })
})

app.use("*", (req, res, next) => {
    const error = {
        message: "404 page not found",
        errorCode: 404,
    }
    next(error)
});

app.use((error, req, res, next) => {
    console.log(error)
    const errorCode = error.errorCode || 500;
    res.status(errorCode).json({
        status: "error",
        message: error.message,
    })
})

app.listen(PORT, (error) => {
    error ? console.log(error.message) : console.log(`Server is running at http://localhost:${PORT}`)
})