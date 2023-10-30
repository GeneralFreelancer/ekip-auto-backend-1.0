"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basket = exports.ProductInBasket = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ProductServices_1 = __importDefault(require("../services/ProductServices"));
const ProductModel_1 = require("./ProductModel");
const UserModel_1 = require("./UserModel");
class ProductInBasket {
}
__decorate([
    (0, typegoose_1.prop)({ ref: ProductModel_1.Product, required: true }),
    __metadata("design:type", String)
], ProductInBasket.prototype, "product", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], ProductInBasket.prototype, "number", void 0);
exports.ProductInBasket = ProductInBasket;
class Basket {
    async getPublicInfo() {
        let products = null;
        if (this.products && this.products.length) {
            const promises = this.products.map(async (p) => {
                const product = await ProductServices_1.default.findProductById(p.product);
                return { product: await (product === null || product === void 0 ? void 0 : product.getPublicInfo()), number: p.number };
            });
            products = await Promise.all(promises);
        }
        return {
            id: this._id,
            products,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    (0, typegoose_1.prop)({ ref: UserModel_1.User, required: true }),
    __metadata("design:type", Object)
], Basket.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: ProductInBasket, required: false, _id: false }),
    __metadata("design:type", Array)
], Basket.prototype, "products", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Basket.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Basket.prototype, "updatedAt", void 0);
exports.Basket = Basket;
exports.default = (0, typegoose_1.getModelForClass)(Basket, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=BasketModel.js.map