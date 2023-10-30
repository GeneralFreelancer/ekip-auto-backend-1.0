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
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const UserServices_1 = require("../../../services/UserServices");
const rateLimiter_1 = require("../../../api/rateLimiter");
const helpers_1 = require("../../../helpers");
const middlewares_1 = require("../../../middlewares");
const UserModel_1 = require("../../../models/UserModel");
const utils_1 = require("../../../utils/utils");
const EmailService_1 = require("../../../services/EmailService");
const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .min(1, 'Email не може бути пустим')
        .max(100, 'Email не може бути довжиною більше 100')
        .email('Внесіть валідний email')
        .required('Email обовязкове поле'),
    password: yup.string().trim().min(6, 'Мінімальна довжина пароля 6 символів').max(50, 'Максимальна довжина пароля 50 символів').required('Пароль обовязкове поле'),
});
const registerIntention = async (req, res) => {
    const { email, password } = req.body;
    const registeredUser = await UserServices_1.UserService.findUserByEmail(email.toLowerCase().trim());
    if (registeredUser)
        return helpers_1.SendError.CONFLICT(res, 'Користувач з даною поштою вже зареєстрований', { errorField: 'email' });
    const hashedPassword = await UserServices_1.UserService.setHashedPasswordToUserModel(password.trim());
    const code = (0, utils_1.generateRandomNumbers)(6);
    await EmailService_1.EmailService.sendVerificationEmail(email, code);
    const user = await UserServices_1.UserService.createUser({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        roles: [UserModel_1.UserRoles.USER],
        codeToVerifyEmail: code,
    });
    return helpers_1.SendResponse.CREATED(res, 'На вашу пошту надіслано лист для підтвердження', { user: user.getPublicInfo() });
};
exports.default = {
    middleware: [rateLimiter_1.fifteenMinutesLimiter, (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(registerIntention),
};
//# sourceMappingURL=intention.js.map