"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleError = exports.SendError = exports.SendResponse = void 0;
const sendResponse_1 = require("./sendResponse");
Object.defineProperty(exports, "SendResponse", { enumerable: true, get: function () { return sendResponse_1.SendResponse; } });
Object.defineProperty(exports, "SendError", { enumerable: true, get: function () { return sendResponse_1.SendError; } });
const consoleError_1 = __importDefault(require("./consoleError"));
exports.consoleError = consoleError_1.default;
//# sourceMappingURL=index.js.map