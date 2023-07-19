import { Types } from 'mongoose'
import OrderHistoryModel, { OrderHistory, ProductInOrder } from '../models/OrderHistoryModel'
import { ProductInBasket } from '../models/BasketModel'
import ProductService from './ProductServices'

export class OrderService {
    static async createOrderHistory(user: string | Types.ObjectId, name: string, weight: number, products: ProductInOrder[], comment?: string) {
        return await OrderHistoryModel.create({ user, products, name, weight, payed: false, comment })
    }

    static async createOrder(user: string | Types.ObjectId, products: ProductInBasket[], comment?: string) {
        let totalWeight = 0
        let totalPrice = 0
        const productsInOrder: ProductInOrder[] = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const productDB = await ProductService.findProductById(product.product)
            if (productDB) {
                let weight = 0
                if (productDB.deliveryOptions && productDB.deliveryOptions.length && productDB.deliveryOptions.some(o => o.name === 'weight')) {
                    const index = productDB.deliveryOptions.findIndex(o => o.name === 'weight')
                    weight = Number(productDB.deliveryOptions[index].value)
                } else if (productDB.options && productDB.options.length && productDB.options.some(o => o.name === 'weight')) {
                    const index = productDB.options.findIndex(o => o.name === 'weight')
                    weight = Number(productDB.options[index].value)
                }
                if (!isNaN(weight)) {
                    weight = weight * product.number
                    totalWeight += weight
                }
                if (productDB?.priceUSD && !isNaN(productDB.priceUSD)) totalPrice += productDB.priceUSD * product.number
                productsInOrder.push({ ...product, weight: isNaN(weight) ? 0 : weight })
            }
        }
        const date = new Intl.DateTimeFormat('UKR', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date()).slice(0, -3)
        const name = `Замовлення від ${date} на ${totalPrice}$`

        const order = await this.createOrderHistory(user, name, totalWeight, productsInOrder, comment)

        return await order.getPublicInfo()
    }

    static async getOrderHistory(user: string | Types.ObjectId) {
        const ordersDB = await OrderHistoryModel.find({ user })
        const promise = ordersDB.map(async o => await o.getPublicInfo())
        const orders = await Promise.all(promise)
        return orders
    }

    static async getOrderById(orderId: string | Types.ObjectId) {
        const order = await OrderHistoryModel.findById(orderId)
        if (!order) return
        return await order.getPublicInfo()
    }

    static async getAllOrders() {
        return await OrderHistoryModel.find()
    }

    static async updateOrder(orderId: string | Types.ObjectId, fields: Partial<OrderHistory>) {
        return await OrderHistoryModel.findByIdAndUpdate(orderId, fields, { new: true })
    }
}

export default OrderService
