import { Types } from 'mongoose'
import { DateTime } from 'luxon'
import OrderHistoryModel, { ProductInOrder } from '../models/OrderHistoryModel'
import { ProductInBasket } from '../models/BasketModel'
import ProductService from './ProductServices'

export class OrderService {
    static async createOrderHistory(user: string | Types.ObjectId, name: string, weight: number, products: ProductInOrder[]) {
        return await OrderHistoryModel.create({ user, products, name, weight })
    }

    static async createOrder(user: string | Types.ObjectId, products: ProductInBasket[]) {
        const now = DateTime.now().setLocale('uk')
        let totalWeight = 0
        let totalPrice = 0
        const productsInOrder: ProductInOrder[] = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const productDB = await ProductService.findProductById(product.product)
            if (productDB) {
                let weight = 0
                if (productDB.deliveryOptions && Object.keys(productDB.deliveryOptions).includes('weight')) weight = Number(productDB.deliveryOptions.weight)
                else if (productDB.options && Object.keys(productDB.options).includes('weight')) weight = Number(productDB.options.weight)
                if (!isNaN(weight)) {
                    weight = weight * product.number
                    totalWeight += weight
                }
                if (productDB?.priceUSD && !isNaN(productDB.priceUSD)) totalPrice += productDB.priceUSD
                productsInOrder.push({ ...product, weight: isNaN(weight) ? 0 : weight })
            }
        }
        const name = `Замовлення: дата ${now.day} ${now.monthLong}, сума ${totalPrice}$`

        const order = await this.createOrderHistory(user, name, totalWeight, productsInOrder)

        return await order.getPublicInfo()
    }

    static async getOrderHistory(user: string | Types.ObjectId) {
        const ordersDB = await OrderHistoryModel.find({ user })
        const promise = ordersDB.map(async o => await o.getPublicInfo())
        const orders = await Promise.all(promise)
        return orders
    }

    static async getAllOrders() {
        return await OrderHistoryModel.find()
    }

    static async updateOrderName(orderId: string | Types.ObjectId, name: string) {
        return await OrderHistoryModel.findByIdAndUpdate(orderId, { name }, { new: true })
    }
}

export default OrderService
