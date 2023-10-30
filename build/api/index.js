"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const exchange_1 = __importDefault(require("./routes/exchange"));
const basket_1 = __importDefault(require("./routes/basket"));
const orderHistory_1 = __importDefault(require("./routes/orderHistory"));
const productRequest_1 = __importDefault(require("./routes/productRequest"));
const advertising_1 = __importDefault(require("./routes/advertising"));
const router = express_1.default.Router();
router.use('/auth', auth_1.default);
router.use('/user', user_1.default);
router.use('/product', product_1.default);
router.use('/exchange', exchange_1.default);
router.use('/basket', basket_1.default);
router.use('/order-history', orderHistory_1.default);
router.use('/product-request', productRequest_1.default);
router.use('/advertising', advertising_1.default);
router.get('/', (_, res) => {
    res.send('Backend API');
});
exports.default = router;
//# sourceMappingURL=index.js.map