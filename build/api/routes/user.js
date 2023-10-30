"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../controllers/user"));
const files_1 = __importDefault(require("../../middlewares/files"));
const router = express_1.default.Router();
router.get('/', user_1.default.getUser.middleware, user_1.default.getUser.handler);
router.put('/user-data', user_1.default.updateData.middleware, user_1.default.updateData.handler);
router.put('/favorite', user_1.default.updateFavoriteProducts.middleware, user_1.default.updateFavoriteProducts.handler);
router.put('/last-seen', user_1.default.updateLastSeenProducts.middleware, user_1.default.updateLastSeenProducts.handler);
router.post('/verification-email', user_1.default.requestVerificationEmail.middleware, user_1.default.requestVerificationEmail.handler);
router.post('/call', user_1.default.requestCall.middleware, user_1.default.requestCall.handler);
router.post('/partner', files_1.default.single('file'), user_1.default.sendPartnerEmail.middleware, user_1.default.sendPartnerEmail.handler);
router.delete('/', user_1.default.removeUser.middleware, user_1.default.removeUser.handler);
exports.default = router;
//# sourceMappingURL=user.js.map