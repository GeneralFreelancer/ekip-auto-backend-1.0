"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const yup = __importStar(require("yup"));
const UserServices_1 = require("../../../services/UserServices");
const helpers_1 = require("../../../helpers");
const middlewares_1 = require("../../../middlewares");
const schema = yup.object().shape({
    password: yup.string().min(6).max(50).required(),
});
const changePassword = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'UКористувача не знайдено', { errorId: 'user_not_authorized' });
    const { password } = req.body;
    const hashedPassword = await UserServices_1.UserService.setHashedPasswordToUserModel(password);
    user.password = hashedPassword;
    await user.save();
    return helpers_1.SendResponse.OK(res, 'Пароль успішно змінено', {});
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(changePassword),
};
//# sourceMappingURL=change.js.map