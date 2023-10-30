"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OrderHistoryModel_1 = __importDefault(require("../models/OrderHistoryModel"));
const ProductServices_1 = __importDefault(require("./ProductServices"));
class OrderService {
    static async createOrderHistory(user, name, weight, products, comment) {
        return await OrderHistoryModel_1.default.create({ user, products, name, weight, payed: false, comment });
    }
    static async createOrder(user, products, comment) {
        let totalWeight = 0;
        let totalPrice = 0;
        const productsInOrder = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productDB = await ProductServices_1.default.findProductById(product.product);
            if (productDB) {
                let weight = 0;
                if (productDB.deliveryOptions && productDB.deliveryOptions.length && productDB.deliveryOptions.some(o => o.name === 'Вага')) {
                    const index = productDB.deliveryOptions.findIndex(o => o.name === 'Вага');
                    weight = Number(productDB.deliveryOptions[index].value.replace(/\D/g, ''));
                }
                else if (productDB.options && productDB.options.length && productDB.options.some(o => o.name === 'Вага')) {
                    const index = productDB.options.findIndex(o => o.name === 'Вага');
                    weight = Number(productDB.options[index].value.replace(/\D/g, ''));
                }
                if (!isNaN(weight)) {
                    weight = weight * product.number;
                    totalWeight += weight;
                }
                if ((productDB === null || productDB === void 0 ? void 0 : productDB.priceUSD) && !isNaN(productDB.priceUSD))
                    totalPrice += productDB.priceUSD * product.number;
                productsInOrder.push({ ...product, weight: isNaN(weight) ? 0 : weight });
            }
        }
        const date = new Intl.DateTimeFormat('UKR', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date()).slice(0, -3);
        const name = `Замовлення від ${date} на ${totalPrice}$`;
        const order = await this.createOrderHistory(user, name, totalWeight, productsInOrder, comment);
        return await order.getPublicInfo();
    }
    static async getOrderHistory(user) {
        const ordersDB = await OrderHistoryModel_1.default.find({ user });
        const promise = ordersDB.map(async (o) => await o.getPublicInfo());
        const orders = await Promise.all(promise);
        return orders;
    }
    static async getOrderById(orderId) {
        const order = await OrderHistoryModel_1.default.findById(orderId);
        if (!order)
            return;
        return await order.getPublicInfo();
    }
    static async getAllOrders() {
        return await OrderHistoryModel_1.default.find();
    }
    static async updateOrder(orderId, fields) {
        return await OrderHistoryModel_1.default.findByIdAndUpdate(orderId, fields, { new: true });
    }
}
exports.OrderService = OrderService;
exports.default = OrderService;
//# sourceMappingURL=OrderService.js.map