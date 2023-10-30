"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder_1 = __importDefault(require("./createOrder"));
const getOrderHistory_1 = __importDefault(require("./getOrderHistory"));
const updateOrderName_1 = __importDefault(require("./updateOrderName"));
const updatePayedStatus_1 = __importDefault(require("./updatePayedStatus"));
const getOrder_1 = __importDefault(require("./getOrder"));
exports.default = {
    createOrder: createOrder_1.default,
    getOrderHistory: getOrderHistory_1.default,
    updateOrderName: updateOrderName_1.default,
    updatePayedStatus: updatePayedStatus_1.default,
    getOrder: getOrder_1.default,
};
//# sourceMappingURL=index.js.map