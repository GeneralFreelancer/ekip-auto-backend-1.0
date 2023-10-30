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
const config_1 = __importDefault(require("../../config"));
const passport_1 = __importDefault(require("passport"));
const yup = __importStar(require("yup"));
const UserModel_1 = require("../../models/UserModel");
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const schema = yup.object().shape({
    main: yup.boolean(),
    productId: yup.string().required(),
});
const addImage = async (req, res) => {
    const { productId, main } = req.body;
    const productDB = await ProductServices_1.default.findProductById(productId);
    if (!productDB)
        return helpers_1.SendError.BAD_REQUEST(res, 'Товар не знайдено');
    if (!req.file)
        return helpers_1.SendError.BAD_REQUEST(res, 'Помилка завантаження файлу');
    const product = await ProductServices_1.default.updateProductImage(productDB, req.file.filename, main);
    const imagePath = config_1.default.API_URL + 'images/' + req.file.filename;
    return helpers_1.SendResponse.OK(res, 'Зображення додано', { product, imagePath });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.roleBasedAuth)([UserModel_1.UserRoles.ADMIN]), (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(addImage),
};
//# sourceMappingURL=addImage.js.map