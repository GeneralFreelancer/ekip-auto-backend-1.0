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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRequest = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ProductModel_1 = require("./ProductModel");
const UserModel_1 = require("./UserModel");
class ProductRequest {
    async getPublicInfo() {
        return {
            id: this._id,
            product: this.product,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    (0, typegoose_1.prop)({ ref: UserModel_1.User, required: true }),
    __metadata("design:type", Object)
], ProductRequest.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: ProductModel_1.Product, required: true }),
    __metadata("design:type", Object)
], ProductRequest.prototype, "product", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, required: true, default: false }),
    __metadata("design:type", Boolean)
], ProductRequest.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], ProductRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], ProductRequest.prototype, "updatedAt", void 0);
exports.ProductRequest = ProductRequest;
exports.default = (0, typegoose_1.getModelForClass)(ProductRequest, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=ProductRequestModel.js.map