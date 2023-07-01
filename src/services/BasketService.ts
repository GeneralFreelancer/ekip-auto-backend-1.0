import { Types } from 'mongoose'
import BasketModel, { ProductInBasket } from '../models/BasketModel'

export class BasketService {
    static async createBasket(user: string | Types.ObjectId, products: ProductInBasket[]) {
        return await BasketModel.create({ user, products })
    }

    static async createOrUpdateBasket(user: string | Types.ObjectId, products: ProductInBasket[]) {
        const basketDB = await this.getBasketByUser(user)
        if (basketDB) {
            basketDB.products = products
            await basketDB.save()
            return await basketDB.getPublicInfo()
        }
        const basket = await this.createBasket(user, products)
        return await basket.getPublicInfo()
    }

    static async getBasketByUser(user: string | Types.ObjectId) {
        return await BasketModel.findOne({ user })
    }
}

export default BasketService
