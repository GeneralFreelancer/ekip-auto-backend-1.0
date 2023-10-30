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
exports.OrderHistory = exports.ProductInOrder = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ProductServices_1 = __importDefault(require("../services/ProductServices"));
const UserModel_1 = require("./UserModel");
class ProductInOrder {
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ProductInOrder.prototype, "product", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], ProductInOrder.prototype, "number", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], ProductInOrder.prototype, "weight", void 0);
exports.ProductInOrder = ProductInOrder;
class OrderHistory {
    async getPublicInfo() {
        let products = null;
        if (this.products && this.products.length) {
            const promises = this.products.map(async (p) => {
                const product = await ProductServices_1.default.findProductById(p.product);
                return { product: await (product === null || product === void 0 ? void 0 : product.getPublicInfo()), number: p.number, weight: p.weight };
            });
            products = await Promise.all(promises);
        }
        return {
            id: this._id,
            products,
            name: this.name,
            weight: this.weight,
            comment: this.comment,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    (0, typegoose_1.prop)({ ref: UserModel_1.User, required: true }),
    __metadata("design:type", Object)
], OrderHistory.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: ProductInOrder, required: false, _id: false }),
    __metadata("design:type", Array)
], OrderHistory.prototype, "products", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], OrderHistory.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], OrderHistory.prototype, "weight", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Boolean }),
    __metadata("design:type", Boolean)
], OrderHistory.prototype, "payed", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: String }),
    __metadata("design:type", String)
], OrderHistory.prototype, "comment", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], OrderHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], OrderHistory.prototype, "updatedAt", void 0);
exports.OrderHistory = OrderHistory;
exports.default = (0, typegoose_1.getModelForClass)(OrderHistory, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=OrderHistoryModel.js.map