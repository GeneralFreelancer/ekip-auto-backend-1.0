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
const yup = __importStar(require("yup"));
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const utils_1 = require("../../utils/utils");
const EmailService_1 = require("../../services/EmailService");
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const schema = yup.object().shape({
    email: yup.string().trim().min(1, 'Поле не може бути пустим').max(100, 'Довжина поля пошти не може бути більше 100 символів').email('Емеіл не валідний').required(),
});
const requestVerificationEmail = async (req, res) => {
    const { email } = req.body;
    const user = await UserServices_1.default.findUserByEmail(email);
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайденоt');
    const code = (0, utils_1.generateRandomNumbers)(6);
    await EmailService_1.EmailService.sendVerificationEmail(email, code);
    user.codeToVerifyEmail = code;
    await user.save();
    return helpers_1.SendResponse.OK(res, 'На вашу пошту надіслано лист для підтвердження', {});
};
exports.default = {
    middleware: [(0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(requestVerificationEmail),
};
//# sourceMappingURL=requestVerificationEmail.js.map