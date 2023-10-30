"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const UserModel_1 = require("../../models/UserModel");
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ProductRequestService_1 = __importDefault(require("../../services/ProductRequestService"));
const deleteProductRequest = async (req, res) => {
    const { id } = req.params;
    const productRequest = await ProductRequestService_1.default.deleteProductRequest(id);
    if (!productRequest)
        return helpers_1.SendError.BAD_REQUEST(res, 'Запит не знайдено');
    const productRequests = await ProductRequestService_1.default.getProductRequests();
    return helpers_1.SendResponse.OK(res, 'Запити', { productRequests });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.roleBasedAuth)([UserModel_1.UserRoles.ADMIN])],
    handler: (0, middlewares_1.controllerWrapper)(deleteProductRequest),
};
//# sourceMappingURL=deleteProductRequest.js.map