"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exchange_1 = __importDefault(require("../../controllers/exchange"));
const router = express_1.default.Router();
router.post('/', exchange_1.default.setExchange.middleware, exchange_1.default.setExchange.handler);
router.get('/', exchange_1.default.getExchange.handler);
exports.default = router;
//# sourceMappingURL=exchange.js.map