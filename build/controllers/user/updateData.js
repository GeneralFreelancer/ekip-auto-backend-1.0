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
const middlewares_1 = require("../../middlewares");
const helpers_1 = require("../../helpers");
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const schema = yup.object().shape({
    phone: yup.string().min(1, 'Поле не може бути пустим').max(20, 'Довжина поля з номером телефону не може бути більше 20 символів'),
    firstName: yup.string().trim().min(2, 'Поле не може бути пустим').max(50, 'Довжина поля імені не може бути більше 50 символів'),
    secondName: yup.string(),
    lastName: yup.string().trim().min(2, 'Поле не може бути пустим').max(50, 'Довжина поля імені не може бути більше 50 символів'),
    email: yup.string().trim().min(1, 'Поле не може бути пустим').max(100, 'Довжина поля пошти не може бути більше 100 символів').email('Емеіл не валідний'),
    livingAddress: yup.object().shape({
        street: yup.string(),
        city: yup.string(),
        additionalInfo: yup.string(),
    }),
});
const updateEmail = async (req, res) => {
    const user = req.user;
    if (!user)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Користувача не знайденоt');
    if (!user.isEmailConfirmed)
        return helpers_1.SendError.UNAUTHORIZED(res, 'Вам потрібно підтвердити email');
    const { phone, firstName, secondName, lastName, email, livingAddress } = req.body;
    if (phone && phone.trim() !== user.phone) {
        const registeredUserByPhone = await UserServices_1.default.findUserByPhone(phone);
        if (registeredUserByPhone)
            return helpers_1.SendError.CONFLICT(res, 'Користувач з даним номером телефону вже зареєстрований', { errorField: 'phone' });
    }
    if (email && email.toLowerCase().trim() !== user.email) {
        const registeredUserByEmail = await UserServices_1.default.findUserByEmail(email);
        if (registeredUserByEmail)
            return helpers_1.SendError.CONFLICT(res, 'Користувач з даною поштою вже зареєстрований', { errorField: 'phone' });
    }
    if (phone)
        user.phone = phone.trim();
    if (email)
        user.email = email.toLowerCase().trim();
    if (firstName)
        user.firstName = firstName.trim();
    if (secondName)
        user.secondName = secondName.trim();
    if (lastName)
        user.lastName = lastName.trim();
    if (livingAddress)
        user.livingAddress = livingAddress;
    await user.save();
    return helpers_1.SendResponse.ACCEPTED(res, 'Дані збережено', { user: user.getPublicInfo() });
};
exports.default = {
    middleware: [passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(updateEmail),
};
//# sourceMappingURL=updateData.js.map