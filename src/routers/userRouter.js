import express from 'express'
import { createUser } from '../models/user/UserModel.js';
import { hashPassword } from '../bcrypt/bcrypt.js';
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
       
        res.json({
            status: 'success',
            message: 'To do get user'
        })
        
    } catch (error) {
        next(error)
    }
})

router.post("/", (req, res, next) => {
    try {
        
        res.json({
            status: 'success',
            message: 'To do create new user user'
        })
        
    } catch (error) {
        next(error)
    }
})

router.post("/admin-user", async(req, res, next) => {
    try {
        req.body.password = hashPassword(req.body.password)
        const user = await createUser(req.body)

        if(user?._id){
            return  res.json({
                status: 'success',
                message: 'To do create admin user'
            })
        }
        res.json({
            status: 'error',
            message: 'Unable to create admin user, please try again!'
        })
        
    } catch (error) {
        next(error)
    }
})

export default router;