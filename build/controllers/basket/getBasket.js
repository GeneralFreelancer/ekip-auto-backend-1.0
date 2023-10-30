"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const BasketService_1 = __importDefault(require("../../services/BasketService"));
const getBasket = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайдено');
    let basket = null;
    basket = await BasketService_1.default.getBasketByUser(user._id);
    if (!basket)
        basket = await BasketService_1.default.createBasket(user._id, []);
    return helpers_1.SendResponse.OK(res, 'Кошик', { basket: await basket.getPublicInfo() });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(getBasket),
};
//# sourceMappingURL=getBasket.js.map