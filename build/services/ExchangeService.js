"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeService = void 0;
const ExchangeModel_1 = __importDefault(require("../models/ExchangeModel"));
class ExchangeService {
    static async setExchange(usdRate) {
        const exchange = await ExchangeModel_1.default.find();
        if (exchange.length) {
            exchange[0].usdRate = usdRate;
            await exchange[0].save();
        }
        else
            await ExchangeModel_1.default.create({ usdRate });
        return usdRate;
    }
    static async getExchange() {
        const exchange = await ExchangeModel_1.default.find();
        if (exchange.length)
            return exchange[0].usdRate;
        else
            return null;
    }
}
exports.ExchangeService = ExchangeService;
exports.default = ExchangeService;
//# sourceMappingURL=ExchangeService.js.map