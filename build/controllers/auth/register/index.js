"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const intention_1 = __importDefault(require("./intention"));
const confirm_1 = __importDefault(require("./confirm"));
exports.default = {
    registerIntention: intention_1.default,
    registerConfirm: confirm_1.default,
};
//# sourceMappingURL=index.js.map