"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createAdvertising_1 = __importDefault(require("./createAdvertising"));
const delImage_1 = __importDefault(require("./delImage"));
const getAdvertising_1 = __importDefault(require("./getAdvertising"));
const updateAdvertising_1 = __importDefault(require("./updateAdvertising"));
const updateAdvertisingImage_1 = __importDefault(require("./updateAdvertisingImage"));
exports.default = {
    createAdvertising: createAdvertising_1.default,
    delImage: delImage_1.default,
    getAdvertising: getAdvertising_1.default,
    updateAdvertising: updateAdvertising_1.default,
    updateAdvertisingImage: updateAdvertisingImage_1.default,
};
//# sourceMappingURL=index.js.map