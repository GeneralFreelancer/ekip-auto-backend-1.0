"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addProducts_1 = __importDefault(require("./addProducts"));
const addImage_1 = __importDefault(require("./addImage"));
const delImage_1 = __importDefault(require("./delImage"));
const getProducts_1 = __importDefault(require("./getProducts"));
const getOneProduct_1 = __importDefault(require("./getOneProduct"));
const delProduct_1 = __importDefault(require("./delProduct"));
const updateProduct_1 = __importDefault(require("./updateProduct"));
const getFavoriteProducts_1 = __importDefault(require("./getFavoriteProducts"));
const updateProducts_1 = __importDefault(require("./updateProducts"));
exports.default = {
    addProducts: addProducts_1.default,
    addImage: addImage_1.default,
    delImage: delImage_1.default,
    getProducts: getProducts_1.default,
    getOneProduct: getOneProduct_1.default,
    delProduct: delProduct_1.default,
    updateProduct: updateProduct_1.default,
    getFavoriteProducts: getFavoriteProducts_1.default,
    updateProducts: updateProducts_1.default,
};
//# sourceMappingURL=index.js.map