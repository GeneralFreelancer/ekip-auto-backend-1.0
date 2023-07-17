import { Types } from 'mongoose'
import ProductRequestModel from '../models/ProductRequestModel'
import ProductService from './ProductServices'
import UserService from './UserServices'

export class ProductRequestService {
    static async createProductRequest(user: string | Types.ObjectId, product: string) {
        return await ProductRequestModel.create({ user, product, status: false })
    }

    static async getProductRequests() {
        const productRequests = await ProductRequestModel.find()
        const promises = productRequests.map(async pr => {
            const product = await ProductService.findProductById(String(pr.product))
            const user = await UserService.findUserById(String(pr.user))
            if (product) {
                const productInfo = await product.getPublicInfo()
                return { createdAt: pr.createdAt, updatedAt: pr.updatedAt, status: pr.status, _id: pr._id, product: productInfo, user: user?.getPublicInfo() }
            }
            return { createdAt: pr.createdAt, updatedAt: pr.updatedAt, status: pr.status, _id: pr._id, user: user?.getPublicInfo() }
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
