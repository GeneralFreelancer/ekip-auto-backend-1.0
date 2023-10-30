"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHistory_1 = __importDefault(require("../../controllers/orderHistory"));
const router = express_1.default.Router();
router.post('/', orderHistory_1.default.createOrder.middleware, orderHistory_1.default.createOrder.handler);
router.get('/', orderHistory_1.default.getOrderHistory.middleware, orderHistory_1.default.getOrderHistory.handler);
router.get('/:id', orderHistory_1.default.getOrder.middleware, orderHistory_1.default.getOrder.handler);
router.put('/name', orderHistory_1.default.updateOrderName.middleware, orderHistory_1.default.updateOrderName.handler);
router.put('/payed', orderHistory_1.default.updatePayedStatus.middleware, orderHistory_1.default.updatePayedStatus.handler);
exports.default = router;
//# sourceMappingURL=orderHistory.js.map