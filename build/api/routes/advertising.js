"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const advertising_1 = __importDefault(require("../../controllers/advertising"));
const files_1 = __importDefault(require("../../middlewares/files"));
const router = express_1.default.Router();
router.get('/', advertising_1.default.getAdvertising.handler);
router.put('/', advertising_1.default.updateAdvertising.middleware, advertising_1.default.updateAdvertising.handler);
router.post('/', advertising_1.default.createAdvertising.middleware, advertising_1.default.createAdvertising.handler);
router.post('/image', files_1.default.single('image'), advertising_1.default.updateAdvertisingImage.middleware, advertising_1.default.updateAdvertisingImage.handler);
router.delete('/image', advertising_1.default.delImage.middleware, advertising_1.default.delImage.handler);
exports.default = router;
//# sourceMappingURL=advertising.js.map