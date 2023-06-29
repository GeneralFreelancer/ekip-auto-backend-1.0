/* eslint-disable no-console */
import { Strategy, ExtractJwt } from 'passport-jwt'
import UserModel from '../models/UserModel'
import { getErrorMessage } from './utils'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Super djvjdvU%hx%^78 puersd jsdkfjsdlkfj3242348sdfsdf secrete',
}

const JWTStrategy = new Strategy(opts, async (payload, done) => {
    const d = new Date()
    const currentTimestamp = Math.round(d.getTime() / 1000)

    try {
        const user: Express.User | null = await UserModel.findById(payload.id)
        if (user && payload.exp > currentTimestamp) {
            return done(null, user)
        }
        return done(null, false)
    } catch (error) {
        console.log(getErrorMessage(error))
    }
})

export default JWTStrategy
