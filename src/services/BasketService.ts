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

    static async addProductInBasket(user: string | Types.ObjectId, product: ProductInBasket) {
        const basketDB = await this.getBasketByUser(user)
        if (basketDB && basketDB.products) {
            if (basketDB.products.some(p => p.product === product.product)) {
                const index = basketDB.products.findIndex(p => p.product === product.product)
                basketDB.products[index] = product
            } else basketDB.products.push(product)
            await basketDB.save()
            return await basketDB.getPublicInfo()
        }
        return
    }
}

export default BasketService
