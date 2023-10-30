"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const OrderService_1 = __importDefault(require("../../services/OrderService"));
const getOrder = async (req, res) => {
    const { id } = req.params;
    const order = await OrderService_1.default.getOrderById(id);
    if (!order)
        return helpers_1.SendError.BAD_REQUEST(res, 'Замовлення не знайдено');
    return helpers_1.SendResponse.OK(res, 'Замовлення', { order });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(getOrder),
};
//# sourceMappingURL=getOrder.js.map