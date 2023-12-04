import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { accessJWTDecode } from "../utils/jwtHelper.js"

export const userAuth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const { authorization } = req.headers
        //validate if accessJWT is validate
        const decoded = accessJWTDecode(authorization);
        console.log(decoded)
        if (decoded?.email) {
            //check if exist
            const tokenExist = await getSession({ token: authorization })
            if (tokenExist?._id) {
                //extract the email, get user by email
                const user = await getUserByEmail(decoded.email)
                if (user?._id) {
                    //everything is true above then set userInfo in req obj and sent to the next middleware
                    user.password = undefined
                    req.userInfo = user
                    return next()
                }
            }
        }
        throw new Error("Invalid token, unauthorized")

    } catch (error) {
        error.errorCode = 401
        if(error.message.includes("jwt expired")){
            error.errorCode = 403
        }
        next(error)
    }
}