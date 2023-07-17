import { Types } from 'mongoose'
import ProductRequestModel from '../models/ProductRequestModel'
import ProductService from './ProductServices'

export class ProductRequestService {
    static async createProductRequest(user: string | Types.ObjectId, product: string) {
        return await ProductRequestModel.create({ user, product, status: false })
    }

    static async getProductRequests() {
        const productRequests = await ProductRequestModel.find().populate('user')
        const promises = productRequests.map(async pr => {
            const product = await ProductService.findProductById(String(pr.product))
            if (product) {
                const productInfo = await product.getPublicInfo()
                return { ...pr, product: productInfo }
            }
            return pr
        })

        return await Promise.all(promises)
    }

    static async updateStatus(productRequestsId: string | Types.ObjectId, status: boolean) {
        return await ProductRequestModel.findByIdAndUpdate(productRequestsId, { status }, { new: true })
    }

    static async deleteProductRequest(productRequestsId: string | Types.ObjectId) {
        return await ProductRequestModel.findByIdAndDelete(productRequestsId)
    }
}

export default ProductRequestService
