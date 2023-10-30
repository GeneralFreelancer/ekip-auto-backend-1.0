"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const config_1 = __importDefault(require("../../config"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const BasketService_1 = __importDefault(require("../../services/BasketService"));
const XlsxService_1 = __importDefault(require("../../services/XlsxService"));
const createXlsx = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайдено');
    const basket = await BasketService_1.default.getBasketByUser(user._id);
    if (!basket)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Кошик пустий');
    const basketInfo = await basket.getPublicInfo();
    if (!basketInfo.products || !basketInfo.products.length)
        return helpers_1.SendError.BAD_REQUEST(res, 'Кошик пустий');
    await XlsxService_1.default.createOrderXlsx(basketInfo.products);
    return helpers_1.SendResponse.OK(res, 'Ексель', { file: config_1.default.APP_DOMAIN + '/excel/order.xlsx' });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(createXlsx),
};
//# sourceMappingURL=createXlsx.js.map