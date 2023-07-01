import { Request, Response } from 'express'
import { SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ProductService, { IGetFilteredProducts } from '../../services/ProductServices'

const getProducts = async (req: Request, res: Response) => {
    const { search, filter, category, subcategory, limit, userId }: IGetFilteredProducts = req.query

    const categories = await ProductService.checkProductsAndGetCategories()
    const products = await ProductService.getFilteredProducts({ search, filter, category, subcategory, limit, userId })

    return SendResponse.OK(res, 'Товари та категорії', { categories, products })
}

export default {
    handler: controllerWrapper(getProducts),
}
