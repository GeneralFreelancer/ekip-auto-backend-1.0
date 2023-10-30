"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = __importDefault(require("./getUser"));
const removeUser_1 = __importDefault(require("./removeUser"));
const requestVerificationEmail_1 = __importDefault(require("./requestVerificationEmail"));
const updateData_1 = __importDefault(require("./updateData"));
const updateFavoriteProducts_1 = __importDefault(require("./updateFavoriteProducts"));
const updateLastSeenProducts_1 = __importDefault(require("./updateLastSeenProducts"));
const requestCall_1 = __importDefault(require("./requestCall"));
const sendPartnerEmail_1 = __importDefault(require("./sendPartnerEmail"));
exports.default = {
    getUser: getUser_1.default,
    removeUser: removeUser_1.default,
    requestVerificationEmail: requestVerificationEmail_1.default,
    updateData: updateData_1.default,
    updateFavoriteProducts: updateFavoriteProducts_1.default,
    updateLastSeenProducts: updateLastSeenProducts_1.default,
    requestCall: requestCall_1.default,
    sendPartnerEmail: sendPartnerEmail_1.default,
};
//# sourceMappingURL=index.js.map