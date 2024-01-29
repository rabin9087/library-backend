import 'dotenv/config'
import express from "express";
import cors from 'cors'
import morgan from 'morgan';
import userRouter from './src/routers/userRouter.js';
import { connectDb } from './src/dbConfig/config.js';
import bookRouter from './src/routers/bookRouter.js';
import burrowRouter from './src/routers/burrowRouter.js';
import reviewRouter from './src/routers/reviewRouter.js';
import { userAuth } from './src/middleware/authMiddleware.js';
const app = express();
const PORT = process.env.PORT || 8080;

//middleware

app.use(cors());
app.use(express.json());
//app.use(morgan());

//Db connection
connectDb();

//api endpoints
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/burrows", userAuth, burrowRouter)

app.get("/", (req, res) => {
    res.status(200).json({
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