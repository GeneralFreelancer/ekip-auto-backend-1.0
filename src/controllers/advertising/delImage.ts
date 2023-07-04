import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import AdvertisingService from '../../services/AdvertisingService'

const schema = yup.object().shape({
    image: yup.string().required(),
})

const delImage = async (req: Request, res: Response) => {
    const { image } = req.body

    const advertising = await AdvertisingService.delImage(image)

    if (!advertising) return SendError.BAD_REQUEST(res, 'Зображення не знайдено')

    return SendResponse.OK(res, 'Зображення видалено', { advertising: advertising.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(delImage),
}
