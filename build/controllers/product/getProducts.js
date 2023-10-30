"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const middlewares_1 = require("../../middlewares");
const UserModel_1 = require("../../models/UserModel");
const ProductServices_1 = __importDefault(require("../../services/ProductServices"));
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const getProducts = async (req, res) => {
    const { search, filter, category, subcategory, limit, userId } = req.query;
    let user = null;
    const token = req.headers.authorization;
    if (token)
        user = await UserServices_1.default.findUserByToken(token);
    const isAdmin = user && user.roles.includes(UserModel_1.UserRoles.ADMIN);
    const categories = await ProductServices_1.default.checkProductsAndGetCategories();
    let products = await ProductServices_1.default.getFilteredProducts({ search, filter, category, subcategory, limit, userId });
    // console.log('Products: ', products);
    if (!isAdmin)
        products = products.filter(p => !p.hidden);
    return helpers_1.SendResponse.OK(res, 'Товари та категорії', { categories, products });
};
exports.default = {
    handler: (0, middlewares_1.controllerWrapper)(getProducts),
};
//# sourceMappingURL=getProducts.js.map