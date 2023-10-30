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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const yup = __importStar(require("yup"));
const UserServices_1 = require("../../../services/UserServices");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../../helpers");
const middlewares_1 = require("../../../middlewares");
const schema = yup.object().shape({
    email: yup.string().email('Емеіл не валідний').required(),
    password: yup.string().min(6, 'Мінімальна довжина пароля 6 символів').max(50).required(),
});
const loginConfirm = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserServices_1.UserService.findUserByEmail(email);
    if (!user)
        return helpers_1.SendError.BAD_REQUEST(res, 'Користувача не знайдено', { errorId: 'user_not_registered' });
    const isPasswordValid = await bcryptjs_1.default.compare(password.trim(), user.password);
    if (!isPasswordValid)
        return helpers_1.SendError.BAD_REQUEST(res, 'Невірний пароль', { errorId: 'validation_error' });
    const token = UserServices_1.UserService.signToken(user);
    return helpers_1.SendResponse.OK(res, 'Success', {
        token,
        user: user.getPublicInfo(),
    });
};
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 15, // limit each IP to 100 requests per windowMs
});
exports.default = {
    middleware: [limiter, (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(loginConfirm),
};
//# sourceMappingURL=confirm.js.map