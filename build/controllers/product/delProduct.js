"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const UserModel_1 = require("../../models/UserModel");
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const delImage = async (req, res) => {
    const { id } = req.params;
    const productDB = await ProductServices_1.default.delProduct(id);
    if (!productDB)
        return helpers_1.SendError.BAD_REQUEST(res, 'Товар не знайдено');
    return helpers_1.SendResponse.OK(res, 'Товар видалено', { product: productDB });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.roleBasedAuth)([UserModel_1.UserRoles.ADMIN])],
    handler: (0, middlewares_1.controllerWrapper)(delImage),
};
//# sourceMappingURL=delProduct.js.map