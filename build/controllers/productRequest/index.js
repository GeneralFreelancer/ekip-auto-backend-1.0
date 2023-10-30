"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createProductRequest_1 = __importDefault(require("./createProductRequest"));
const updateStatus_1 = __importDefault(require("./updateStatus"));
const getProductRequests_1 = __importDefault(require("./getProductRequests"));
const deleteProductRequest_1 = __importDefault(require("./deleteProductRequest"));
exports.default = {
    createProductRequest: createProductRequest_1.default,
    updateStatus: updateStatus_1.default,
    getProductRequests: getProductRequests_1.default,
    deleteProductRequest: deleteProductRequest_1.default,
};
//# sourceMappingURL=index.js.map