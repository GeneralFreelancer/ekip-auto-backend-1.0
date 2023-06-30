import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import ExchangeService from '../../services/ExchangeService'

const schema = yup.object().shape({
    usdRate: yup.number().required(),
})

const setExchange = async (req: Request, res: Response) => {
    const { usdRate } = req.body

    await ExchangeService.setExchange(usdRate)

    return SendResponse.OK(res, 'Курс збережено', { usdRate })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(setExchange),
}
