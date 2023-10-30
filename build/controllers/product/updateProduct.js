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
const passport_1 = __importDefault(require("passport"));
const yup = __importStar(require("yup"));
const UserModel_1 = require("../../models/UserModel");
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const schema = yup.object().shape({
    id: yup.string().required(),
    stock: yup.boolean(),
    inTopRate: yup.boolean(),
    hidden: yup.boolean(),
    name: yup.string(),
    description: yup.string(),
    sku: yup.string(),
    category: yup.string(),
    subCategory: yup.string(),
    quantity: yup.number(),
    minQuantity: yup.number(),
    priceUSD: yup.number(),
    priceUAH: yup.number(),
    options: yup.array().of(yup.object().shape({})),
    deliveryOptions: yup.array().of(yup.object().shape({})),
    pictures: yup.array().of(yup.string()),
});
const updateProduct = async (req, res) => {
    const { id, stock, inTopRate, hidden, name, description, sku, category, subCategory, quantity, minQuantity, priceUSD, priceUAH, options, deliveryOptions, pictures } = req.body;
    const product = await ProductServices_1.default.updateProduct(id, {
        stock,
        inTopRate,
        hidden,
        name,
        description,
        sku,
        category,
        subCategory,
        quantity,
        minQuantity,
        priceUSD,
        priceUAH,
        options,
        deliveryOptions,
        pictures,
    });
    if (!product)
        return helpers_1.SendError.BAD_REQUEST(res, 'Помилка оновлення');
    return helpers_1.SendResponse.OK(res, 'Товар оновлено', { product: await product.getPublicInfo() });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.roleBasedAuth)([UserModel_1.UserRoles.ADMIN]), (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(updateProduct),
};
//# sourceMappingURL=updateProduct.js.map