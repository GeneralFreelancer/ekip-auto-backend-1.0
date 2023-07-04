import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import { UserRoles } from '../../models/UserModel'
import AdvertisingService from '../../services/AdvertisingService'

const schema = yup.object().shape({
    desktop: yup.array().of(
        yup.object().shape({
            image: yup.string(),
            url: yup.string(),
        }),
    ),
    tablet: yup.array().of(
        yup.object().shape({
            image: yup.string(),
            url: yup.string(),
        }),
    ),
    mobile: yup.array().of(
        yup.object().shape({
            image: yup.string(),
            url: yup.string(),
        }),
    ),
})

const createAdvertising = async (req: Request, res: Response) => {
    const { desktop, tablet, mobile } = req.body
    let advertising = null
    advertising = await AdvertisingService.getAdvertising()

    if (!advertising) advertising = await AdvertisingService.createAdvertising({ desktop, tablet, mobile })
    else advertising = await AdvertisingService.updateAdvertising(advertising._id, { desktop, tablet, mobile })

    if (!advertising) return SendError.BAD_REQUEST(res, 'Помилка')

    return SendResponse.OK(res, 'Реклама', { advertising: advertising.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(createAdvertising),
}
