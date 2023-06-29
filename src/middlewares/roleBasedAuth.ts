import { UserRole } from '../models/UserModel'
import { Request, Response, NextFunction } from 'express'

const roleBasedAuth = (roles: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.roles.some((r: UserRole) => roles.includes(r))) {
            return next()
        } else {
            return res.status(401).send('User don’t have access to this resource')
        }
    }
}

export default roleBasedAuth
