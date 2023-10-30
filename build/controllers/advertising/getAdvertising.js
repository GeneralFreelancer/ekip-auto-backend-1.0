"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const AdvertisingService_1 = __importDefault(require("../../services/AdvertisingService"));
const getAdvertising = async (req, res) => {
    let advertising = null;
    advertising = await AdvertisingService_1.default.getAdvertising();
    if (!advertising)
        advertising = await AdvertisingService_1.default.createAdvertising({ desktop: [], tablet: [], mobile: [] });
    return helpers_1.SendResponse.OK(res, 'Реклама', { advertising: advertising.getPublicInfo() });
};
exports.default = {
    handler: (0, middlewares_1.controllerWrapper)(getAdvertising),
};
//# sourceMappingURL=getAdvertising.js.map