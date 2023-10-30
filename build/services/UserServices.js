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
exports.UserService = void 0;
const utils_1 = require("./../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importStar(require("../models/UserModel"));
const helpers_1 = require("../helpers");
class UserService {
    static async createUser(fields) {
        const user = await UserModel_1.default.create({ ...fields, roles: fields.roles ? fields.roles : [UserModel_1.UserRoles.USER] });
        return user;
    }
    static signToken(user, expiration) {
        let expiresIn = 3600 * 24 * 30;
        const isProvider = false;
        // if (user.roles.find((r: UserRoles) => r === UserRoles.ADMIN)) expiresIn = 3600 * 4
        // if (user.roles.find((r: UserRoles) => r === UserRoles.LENDER)) isProvider = true
        if (expiration)
            expiresIn = expiration;
        const payload = {
            id: user._id,
            isProvider: isProvider,
        };
        const token = jsonwebtoken_1.default.sign(payload, 'Super djvjdvU%hx%^78 puersd jsdkfjsdlkfj3242348sdfsdf secrete', { expiresIn });
        return token;
    }
    static async findUserByToken(token) {
        let user = null;
        const arrToken = token.split(' ');
        if (!arrToken.length)
            return user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload = jsonwebtoken_1.default.verify(arrToken[1], 'Super djvjdvU%hx%^78 puersd jsdkfjsdlkfj3242348sdfsdf secrete');
        if (payload.id)
            user = await UserModel_1.default.findById(payload.id);
        return user;
    }
    static async setHashedPasswordToUserModel(password) {
        return await bcryptjs_1.default.hash(password.trim(), 10);
    }
    static async findAllUsers() {
        return await UserModel_1.default.find();
    }
    static async findUserByPhone(phone) {
        return await UserModel_1.default.findOne({ phone });
    }
    static async findUserByEmailCode(code) {
        return await UserModel_1.default.findOne({ codeToVerifyEmail: code });
    }
    static async findUserByPhoneOrEmail(phone, email) {
        return await UserModel_1.default.find({ $or: [{ phone }, { email }] });
    }
    static async findUserByEmail(email) {
        const user = await UserModel_1.default.findOne({ email });
        return user;
    }
    static async findUserById(id) {
        const user = await UserModel_1.default.findOne({ _id: id });
        return user;
    }
    static async deleteUser(userId) {
        try {
            return await UserModel_1.default.findOneAndDelete({ _id: userId });
        }
        catch (error) {
            (0, helpers_1.consoleError)('MethodServices.deleteUser', (0, utils_1.getErrorMessage)(error));
            return;
        }
    }
    static async updateFavoriteProducts(user, productId) {
        if (!user.favoriteProducts || !user.favoriteProducts.length)
            user.favoriteProducts = [productId];
        else {
            if (user.favoriteProducts.includes(productId))
                user.favoriteProducts = user.favoriteProducts.filter(p => p !== productId);
            else
                user.favoriteProducts.unshift(productId);
        }
        await user.save();
        return user.getPublicInfo();
    }
    static async updateLastSeenProducts(user, productId) {
        if (!user.lastSeenProducts || !user.lastSeenProducts.length)
            user.lastSeenProducts = [productId];
        else if (!user.lastSeenProducts.includes(productId))
            user.lastSeenProducts.unshift(productId);
        await user.save();
        return user.getPublicInfo();
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=UserServices.js.map