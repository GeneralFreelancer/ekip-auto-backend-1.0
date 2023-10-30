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
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const EmailService_1 = require("../../services/EmailService");
const ProductRequestService_1 = __importDefault(require("../../services/ProductRequestService"));
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const schema = yup.object().shape({
    productId: yup.string().required(),
});
const createProductRequest = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайдено');
    const { productId } = req.body;
    const product = await ProductServices_1.default.findProductById(productId);
    if (!product)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Товар не знайдено');
    const productRequest = await ProductRequestService_1.default.createProductRequest(user._id, productId);
    await EmailService_1.EmailService.sendRequestOrderEmail(user.email, user.firstName, user.lastName, user.phone, product.name, product.sku);
    return helpers_1.SendResponse.OK(res, 'Запит створено', { productRequest });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(createProductRequest),
};
//# sourceMappingURL=createProductRequest.js.map