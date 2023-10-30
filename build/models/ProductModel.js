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
exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ExchangeModel_1 = __importDefault(require("./ExchangeModel"));
class Product {
    async getPublicInfo() {
        var _a;
        let priceUAH = null;
        // config.APP_DOMAIN + '/images/' + 
        const pictures = (_a = this.pictures) === null || _a === void 0 ? void 0 : _a.map(p => p);
        const exchange = await ExchangeModel_1.default.find();
        if (exchange.length && this.priceUSD) {
            priceUAH = exchange[0].usdRate * this.priceUSD;
        }
        return {
            id: this._id,
            inTopRate: this.inTopRate,
            stock: this.stock,
            hidden: this.hidden,
            name: this.name,
            description: this.description,
            sku: this.sku,
            category: this.category,
            subCategory: this.subCategory,
            quantity: this.quantity,
            minQuantity: this.minQuantity,
            minQuantity1: this.minQuantity1,
            priceUSD: this.priceUSD,
            priceUSDless: this.priceUSDless,
            priceUAH: priceUAH ? priceUAH : this.priceUAH,
            options: this.options,
            deliveryOptions: this.deliveryOptions,
            pictures,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    (0, typegoose_1.prop)({ default: false, required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], Product.prototype, "inTopRate", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false, required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false, required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], Product.prototype, "hidden", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "subCategory", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "minQuantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "minQuantity1", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "priceUSD", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "priceUAH", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Product.prototype, "priceUSDless", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array, required: false, _id: false, allowMixed: typegoose_1.Severity.ALLOW }),
    __metadata("design:type", Array)
], Product.prototype, "options", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array, required: false, _id: false, allowMixed: typegoose_1.Severity.ALLOW }),
    __metadata("design:type", Array)
], Product.prototype, "deliveryOptions", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array, required: false, allowMixed: typegoose_1.Severity.ALLOW }),
    __metadata("design:type", Array)
], Product.prototype, "pictures", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product;
exports.default = (0, typegoose_1.getModelForClass)(Product, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=ProductModel.js.map