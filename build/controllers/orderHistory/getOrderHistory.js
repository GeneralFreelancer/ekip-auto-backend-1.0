"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const OrderService_1 = __importDefault(require("../../services/OrderService"));
const getOrderHistory = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайдено');
    const orderHistory = await OrderService_1.default.getOrderHistory(user._id);
    return helpers_1.SendResponse.OK(res, 'Історія замовлень', { orderHistory });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(getOrderHistory),
};
//# sourceMappingURL=getOrderHistory.js.map