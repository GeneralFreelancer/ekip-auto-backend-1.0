"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const middlewares_1 = require("../../middlewares");
const helpers_1 = require("../../helpers");
const removeUser = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайдено');
    const removedUser = await UserServices_1.default.deleteUser(user._id);
    if (!removedUser)
        return helpers_1.SendError.BAD_REQUEST(res, 'Щось пішло не так');
    return helpers_1.SendResponse.OK(res, 'Користувач видалений', { removedUser });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false })],
    handler: (0, middlewares_1.controllerWrapper)(removeUser),
};
//# sourceMappingURL=removeUser.js.map