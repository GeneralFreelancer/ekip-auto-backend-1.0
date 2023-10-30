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
const UserServices_1 = require("../../../services/UserServices");
const yup = __importStar(require("yup"));
const helpers_1 = require("../../../helpers");
const middlewares_1 = require("../../../middlewares");
const schema = yup.object().shape({
    code: yup.string().min(1, 'Помилка коду').max(10, 'Помилка коду').required('Code is a required field'),
});
const registerConfirm = async (req, res) => {
    const { code } = req.body;
    const user = await UserServices_1.UserService.findUserByEmailCode(code);
    if (!user)
        return helpers_1.SendError.BAD_REQUEST(res, 'Помилка коду', { errorId: 'invalid_security_code' });
    const token = await UserServices_1.UserService.signToken(user);
    user.isEmailConfirmed = true;
    user.codeToVerifyEmail = undefined;
    await user.save();
    return helpers_1.SendResponse.OK(res, 'Success', { token, user: user.getPublicInfo() });
};
exports.default = {
    middleware: [(0, middlewares_1.validation)(schema)],
    handler: (0, middlewares_1.controllerWrapper)(registerConfirm),
};
//# sourceMappingURL=confirm.js.map