import { Request, Response } from 'express'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ExchangeService from '../../services/ExchangeService'

const setExchange = async (req: Request, res: Response) => {
    const usdRate = await ExchangeService.getExchange()

    if (!usdRate) return SendError.BAD_REQUEST(res, 'Курс не задано')

    return SendResponse.OK(res, 'Курс', { usdRate })
}

export default {
    handler: controllerWrapper(setExchange),
}
