"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basket_1 = __importDefault(require("../../controllers/basket"));
const router = express_1.default.Router();
router.post('/', basket_1.default.createOrUpdateBasket.middleware, basket_1.default.createOrUpdateBasket.handler);
router.get('/', basket_1.default.getBasket.middleware, basket_1.default.getBasket.handler);
router.put('/', basket_1.default.addProductInBasket.middleware, basket_1.default.addProductInBasket.handler);
router.get('/xlsx', basket_1.default.createXlsx.middleware, basket_1.default.createXlsx.handler);
exports.default = router;
//# sourceMappingURL=basket.js.map