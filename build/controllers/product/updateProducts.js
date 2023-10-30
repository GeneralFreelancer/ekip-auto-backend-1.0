"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const schema = yup.object().shape({
    products: yup.array().of(yup.object().shape({
        stock: yup.boolean(),
        name: yup.string(),
        description: yup.string(),
        sku: yup.string(),
        category: yup.string(),
        subCategory: yup.string(),
        quantity: yup.number(),
        minQuantity: yup.number(),
        minQuantity1: yup.number(),
        priceUAH: yup.number(),
        priceUSD: yup.number(),
        priceUSDless: yup.number(),
        options: yup.array().of(yup.object().shape({})),
        deliveryOptions: yup.array().of(yup.object().shape({})),
    })),
});
const updateProducts = async (req, res) => {
    const { products } = req.body;
    console.log('Update products from 1C req body: ', req.body);
    if (!products || !products.length)
        return helpers_1.SendError.BAD_REQUEST(res, 'Помилка додавання');
    await ProductServices_1.default.updateProducts(products);
    return helpers_1.SendResponse.OK(res, 'Продукти додано', {});
};
exports.default = {
    middleware: [(0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(updateProducts),
};
//# sourceMappingURL=updateProducts.js.map