"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fifteenMinutesLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
});
exports.fifteenMinutesLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 15, // limit each IP to 100 requests per windowMs
});
exports.default = limiter;
//# sourceMappingURL=rateLimiter.js.map