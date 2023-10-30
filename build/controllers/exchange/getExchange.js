"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const ExchangeService_1 = __importDefault(require("../../services/ExchangeService"));
const setExchange = async (req, res) => {
    const usdRate = await ExchangeService_1.default.getExchange();
    if (!usdRate)
        return helpers_1.SendError.BAD_REQUEST(res, 'Курс не задано');
    return helpers_1.SendResponse.OK(res, 'Курс', { usdRate });
};
exports.default = {
    handler: (0, middlewares_1.controllerWrapper)(setExchange),
};
//# sourceMappingURL=getExchange.js.map