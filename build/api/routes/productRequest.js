"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRequest_1 = __importDefault(require("../../controllers/productRequest"));
const router = express_1.default.Router();
router.post('/', productRequest_1.default.createProductRequest.middleware, productRequest_1.default.createProductRequest.handler);
router.get('/', productRequest_1.default.getProductRequests.middleware, productRequest_1.default.getProductRequests.handler);
router.put('/', productRequest_1.default.updateStatus.middleware, productRequest_1.default.updateStatus.handler);
router.delete('/:id', productRequest_1.default.deleteProductRequest.middleware, productRequest_1.default.deleteProductRequest.handler);
exports.default = router;
//# sourceMappingURL=productRequest.js.map