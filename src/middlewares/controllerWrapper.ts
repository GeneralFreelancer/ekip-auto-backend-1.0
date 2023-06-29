import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controllerWrapper = (ctrl: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default controllerWrapper
