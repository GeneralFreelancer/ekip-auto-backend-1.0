import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import AdvertisingService, { ImageType } from '../../services/AdvertisingService'

const schema = yup.object().shape({
    type: yup.mixed<ImageType>().oneOf(Object.values(ImageType)).required(),
    url: yup.string(),
})

const updateAdvertisingImage = async (req: Request, res: Response) => {
    const { type, url } = req.body
    const advertising = await AdvertisingService.getAdvertising()

    if (!advertising) return SendError.BAD_REQUEST(res, 'Помилка')
    if (!req.file) return SendError.BAD_REQUEST(res, 'Помилка завантаження файлу')

    const updateAdvertising = await AdvertisingService.updateAdvertisingImage(advertising, { image: req.file.filename, url }, type)

    return SendResponse.OK(res, 'Зображення додано', { advertising: updateAdvertising })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(updateAdvertisingImage),
}
