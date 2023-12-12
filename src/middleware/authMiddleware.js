import { getSession } from "../models/session/SessionModel.js";
import { getOneAdmin, getUserByEmail } from "../models/user/UserModel.js";
import { accessJWTDecode, refreshJWTDecode, signAccessJWT } from "../utils/jwtHelper.js"

export const getUserFromAccessJWT = async (accessJWT) => {

    //validate if accessJWT is validate
    const decoded = accessJWTDecode(accessJWT);
    if (decoded?.email) {
        //check if exist
        const tokenExist = await getSession({ token: accessJWT })
        if (tokenExist?._id) {
            //extract the email, get user by email
            const user = await getUserByEmail(decoded.email)
            if (user?.id) {
                //everything is true above then set userInfo in req obj and sent to the next middleware
                user.password = undefined
                return user
            }
        }
    }
    return false
}

export const userAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        //validate if accessJWT is validate
        const user = await getUserFromAccessJWT(authorization)

        if (user?._id) {
            //everything is true above then set userInfo in req obj and sent to the next middleware
            user.password = undefined
            req.userInfo = user
            return next()
        }
    } catch (error) {
        error.errorCode = 401
        if (error.message.includes("jwt expired")) {
            error.errorCode = 403
        }
        next(error)
    }
}

export const adminAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const user = await getUserFromAccessJWT(authorization)
        if (user?.role === "admin") {
            //everything is true above then set userInfo in req obj and sent to the next middleware
            user.password = undefined
            req.userInfo = user
            return next()
        }

    } catch (error) {
        error.errorCode = 401
        if (error.message.includes("jwt expired")) {
            error.errorCode = 403
        }
        next(error)
    }
}

export const refreshAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        //validate if refreshJWT is validate
        const decoded = refreshJWTDecode(authorization);

        if (decoded?.email) {
            //check if exist
            //extract the email, get user by email
            const user = await getOneAdmin({ email: decoded.email, refreshJWT: authorization })
            if (user?._id) {
                //create new accessJWT and return
                const accessJWT = signAccessJWT({ email: user.email })
                return res.json({
                    status: "success",
                    accessJWT
                })
            }
        }
        throw new Error("Invalid token, unauthorized")

    } catch (error) {
        error.errorCode = 401
        if (error.message.includes("jwt expired")) {
            error.errorCode = 403
        }
        next(error)
    }
}