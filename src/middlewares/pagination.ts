import { Request, Response, NextFunction } from 'express'

const pagination = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { page, limit } = req.query

        const pageInt = page ? parseInt(page.toString()) : 1
        const limitInt = limit ? parseInt(limit.toString()) : 10

        const skip = (pageInt - 1) * limitInt

        req.pagination = { skip, limit: limitInt }
        next()
    }
}

export default pagination
