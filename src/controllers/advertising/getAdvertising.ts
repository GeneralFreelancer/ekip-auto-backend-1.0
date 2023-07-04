import { Request, Response } from 'express'
import { SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import AdvertisingService from '../../services/AdvertisingService'

const getAdvertising = async (req: Request, res: Response) => {
    let advertising = null
    advertising = await AdvertisingService.getAdvertising()

    if (!advertising) advertising = await AdvertisingService.createAdvertising({ desktop: [], tablet: [], mobile: [] })

    return SendResponse.OK(res, 'Реклама', { advertising: advertising.getPublicInfo() })
}

export default {
    handler: controllerWrapper(getAdvertising),
}
