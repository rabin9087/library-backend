import express from 'express'
import { createUser, getUserByEmail, updateRefreshJWT } from '../models/user/UserModel.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import { loginValidation, newUserValidation } from '../middleware/joiValidation.js';
import { signJWTs } from '../utils/jwtHelper.js';
import { refreshAuth, userAuth } from '../middleware/authMiddleware.js';
import { deleteSession } from '../models/session/SessionModel.js';
const router = express.Router();

router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await getUserByEmail(email);

        if (user?._id) {
            const isMatched = comparePassword(password, user.password)
            if (isMatched) {
                //jwts
                const jwts = signJWTs(user.email)
                return res.json({
                    status: "success",
                    message: "Successfully login",
                    jwts
                })
            }
        }
        res.json({
            status: 'error',
            message: 'login failed, please try again'
        })

    } catch (error) {
        next(error)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
        const { accessJWT, email } = req.body

            //remove from session table
            accessJWT && await deleteSession({token: accessJWT})
        
            //update refreshJWt to "" in user table
           email && await updateRefreshJWT(email, "")
        
        res.json({
            status: 'success',
            message: 'You have been loged out'
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

//create admin user
//below this router should be private
router.post("/admin-user", newUserValidation, async (req, res, next) => {
    try {
        req.body.password = hashPassword(req.body.password);
        req.body.role = 'admin';
        const user = await createUser(req.body)

        if (user?._id) {
            return res.json({
                status: 'success',
                message: 'The new admin has been created successfully'
            })
        }
        res.json({
            status: 'error',
            message: 'Unable to create admin user, please try again!'
        })

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "User is already exist, please use different email"
            error.errorCode = 200;
        }
        next(error)
    }
})

router.get("/", userAuth, async (req, res, next) => {
   try{
    res.json({
        status: "success",
        message: "User info are",
        user: req.userInfo,
    })
    } catch (error) {
        next(error)
    }
})

router.get("/get-accessjwt", refreshAuth)

export default router;