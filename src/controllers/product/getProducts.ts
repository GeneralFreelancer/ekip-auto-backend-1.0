import { Request, Response } from 'express'
import { SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import { UserRoles } from '../../models/UserModel'
import ProductService, { IGetFilteredProducts } from '../../services/ProductServices'
import UserService from '../../services/UserServices'

const getProducts = async (req: Request, res: Response) => {
    const { search, filter, category, subcategory, limit, userId }: IGetFilteredProducts = req.query

    let user = null
    const token = req.headers.authorization
    if (token) user = await UserService.findUserByToken(token)
    const isAdmin = user && user.roles.includes(UserRoles.ADMIN)

    const categories = await ProductService.checkProductsAndGetCategories()
    let products = await ProductService.getFilteredProducts({ search, filter, category, subcategory, limit, userId })
    // console.log('Products: ', products);

    if (!isAdmin) products = products.filter(p => !p.hidden)

    return SendResponse.OK(res, 'Товари та категорії', { categories, products })
}

export default {
    handler: controllerWrapper(getProducts),
}
