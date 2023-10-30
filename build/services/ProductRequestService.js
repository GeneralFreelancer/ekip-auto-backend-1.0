"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRequestService = void 0;
const ProductRequestModel_1 = __importDefault(require("../models/ProductRequestModel"));
const ProductServices_1 = __importDefault(require("./ProductServices"));
const UserServices_1 = __importDefault(require("./UserServices"));
class ProductRequestService {
    static async createProductRequest(user, product) {
        return await ProductRequestModel_1.default.create({ user, product, status: false });
    }
    static async getProductRequests() {
        const productRequests = await ProductRequestModel_1.default.find();
        const promises = productRequests.map(async (pr) => {
            const product = await ProductServices_1.default.findProductById(String(pr.product));
            const user = await UserServices_1.default.findUserById(String(pr.user));
            if (product) {
                const productInfo = await product.getPublicInfo();
                return { createdAt: pr.createdAt, updatedAt: pr.updatedAt, status: pr.status, _id: pr._id, product: productInfo, user: user === null || user === void 0 ? void 0 : user.getPublicInfo() };
            }
            return { createdAt: pr.createdAt, updatedAt: pr.updatedAt, status: pr.status, _id: pr._id, user: user === null || user === void 0 ? void 0 : user.getPublicInfo() };
        });
        return await Promise.all(promises);
    }
    static async updateStatus(productRequestsId, status) {
        return await ProductRequestModel_1.default.findByIdAndUpdate(productRequestsId, { status }, { new: true });
    }
    static async deleteProductRequest(productRequestsId) {
        return await ProductRequestModel_1.default.findByIdAndDelete(productRequestsId);
    }
}
exports.ProductRequestService = ProductRequestService;
exports.default = ProductRequestService;
//# sourceMappingURL=ProductRequestService.js.map