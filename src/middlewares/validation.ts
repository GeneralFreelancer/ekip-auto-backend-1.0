import * as yup from 'yup'
import { Request, Response, NextFunction } from 'express'
import { SendError } from '../helpers/sendResponse'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validation = (schema: yup.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body)
            return next()
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                return SendError.BAD_REQUEST(res, err.message)
            }
        }
    }
}

export default validation
