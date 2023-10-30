"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const getProducts = async (req, res) => {
    const { id } = req.params;
    const product = await ProductServices_1.default.findProductById(id);
    if (!product)
        return helpers_1.SendError.BAD_REQUEST(res, 'Товар не знайдено');
    return helpers_1.SendResponse.OK(res, 'Товари', { product: await product.getPublicInfo() });
};
exports.default = {
    handler: (0, middlewares_1.controllerWrapper)(getProducts),
};
//# sourceMappingURL=getOneProduct.js.map