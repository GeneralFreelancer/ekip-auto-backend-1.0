import { Request, Response } from 'express'
import { SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ProductService, { IGetFilteredProducts } from '../../services/ProductServices'

const getProducts = async (req: Request, res: Response) => {
    const { search, filter, category, subcategory, limit, userId }: IGetFilteredProducts = req.query

    await ProductService.checkProducts()
    const products = await ProductService.getFilteredProducts({ search, filter, category, subcategory, limit, userId })

    return SendResponse.OK(res, 'Товари', { products })
}

export default {
    handler: controllerWrapper(getProducts),
}
