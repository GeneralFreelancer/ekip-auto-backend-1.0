"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const getUser = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.NOT_FOUND(res, 'Користувача не знайдено', { errorId: 'not_authorized' });
    return helpers_1.SendResponse.OK(res, 'User', { user: user.getPublicInfo() });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(getUser),
};
//# sourceMappingURL=getUser.js.map