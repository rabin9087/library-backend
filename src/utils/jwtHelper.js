import jwt from 'jsonwebtoken'
import { createSession } from '../models/session/SessionModel.js'
import { updateRefreshJWT } from '../models/user/UserModel.js'

//access jwt: session table, expire: 15 min
export const signAccessJWT = (obj) => {
    const token =  jwt.sign(obj, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    });
    createSession({token})
    return token
}

export const accessJWTDecode = (accessJWT) => {
    return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET)
}

export const refreshJWTDecode = (refreshJWT) => {
    return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET)
}

//refresh jwt: user table, expire : 30 days

export const signRefreshJWT = (email) => {
    try {
        const token = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30 days" })
            updateRefreshJWT(email, token)
            return token
    } catch (error) {
        console.log(error)
    }
}

export const signJWTs = (email) => {
    return {
        accessJWT: signAccessJWT({email}),
        refreshJWT: signRefreshJWT(email)
    }
}