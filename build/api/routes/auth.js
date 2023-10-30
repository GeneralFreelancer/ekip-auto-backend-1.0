"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../../controllers/auth/login"));
const register_1 = __importDefault(require("../../controllers/auth/register"));
const password_1 = __importDefault(require("../../controllers/auth/password"));
const router = express_1.default.Router();
router.post('/login', login_1.default.loginConfirm.middleware, login_1.default.loginConfirm.handler);
router.post('/register', register_1.default.registerIntention.middleware, register_1.default.registerIntention.handler);
router.post('/register/confirm', register_1.default.registerConfirm.middleware, register_1.default.registerConfirm.handler);
router.post('/password/change', password_1.default.changePassword.middleware, password_1.default.changePassword.handler);
exports.default = router;
//# sourceMappingURL=auth.js.map