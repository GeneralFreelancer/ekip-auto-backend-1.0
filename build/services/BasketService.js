"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketService = void 0;
const BasketModel_1 = __importDefault(require("../models/BasketModel"));
class BasketService {
    static async createBasket(user, products) {
        return await BasketModel_1.default.create({ user, products });
    }
    static async createOrUpdateBasket(user, products) {
        const basketDB = await this.getBasketByUser(user);
        if (basketDB) {
            basketDB.products = products;
            await basketDB.save();
            return await basketDB.getPublicInfo();
        }
        const basket = await this.createBasket(user, products);
        return await basket.getPublicInfo();
    }
    static async getBasketByUser(user) {
        return await BasketModel_1.default.findOne({ user });
    }
    static async addProductInBasket(user, product) {
        const basketDB = await this.getBasketByUser(user);
        if (basketDB && basketDB.products) {
            if (basketDB.products.some(p => p.product === product.product)) {
                const index = basketDB.products.findIndex(p => p.product === product.product);
                basketDB.products[index] = product;
            }
            else
                basketDB.products.push(product);
            await basketDB.save();
            return await basketDB.getPublicInfo();
        }
        return;
    }
}
exports.BasketService = BasketService;
exports.default = BasketService;
//# sourceMappingURL=BasketService.js.map