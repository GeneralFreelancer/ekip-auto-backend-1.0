import { Types } from 'mongoose'
import ProductRequestModel from '../models/ProductRequestModel'

export class ProductRequestService {
    static async createProductRequest(user: string | Types.ObjectId, product: string) {
        return await ProductRequestModel.create({ user, product, status: false })
    }

    static async getProductRequests() {
        return await ProductRequestModel.find().populate('user').populate('product')
    }

    static async updateStatus(productRequestsId: string | Types.ObjectId, status: boolean) {
        return await ProductRequestModel.findByIdAndUpdate(productRequestsId, { status }, { new: true })
    }
}

export default ProductRequestService
