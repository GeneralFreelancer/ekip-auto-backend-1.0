"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../../controllers/product"));
const files_1 = __importDefault(require("../../middlewares/files"));
const router = express_1.default.Router();
router.get('/', product_1.default.getProducts.handler);
router.get('/favorite', product_1.default.getFavoriteProducts.middleware, product_1.default.getFavoriteProducts.handler);
router.get('/:id', product_1.default.getOneProduct.handler);
router.put('/', product_1.default.updateProduct.middleware, product_1.default.updateProduct.handler);
//Add products from 1C API endpoint
router.post('/add', product_1.default.addProducts.middleware, product_1.default.addProducts.handler);
//Update products from 1C API endpoint
router.post('/update', product_1.default.updateProducts.middleware, product_1.default.updateProducts.handler);
router.post('/image', files_1.default.single('image'), product_1.default.addImage.middleware, product_1.default.addImage.handler);
router.delete('/image', product_1.default.delImage.middleware, product_1.default.delImage.handler);
router.delete('/:id', product_1.default.delProduct.middleware, product_1.default.delProduct.handler);
exports.default = router;
//# sourceMappingURL=product.js.map