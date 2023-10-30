"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = exports.ProductFilter = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const mongodb_1 = require("mongodb");
const UserServices_1 = __importDefault(require("./UserServices"));
const OrderService_1 = __importDefault(require("./OrderService"));
const utils_1 = require("../utils/utils");
var ProductFilter;
(function (ProductFilter) {
    ProductFilter["DATE"] = "date";
    ProductFilter["TOP"] = "top";
    ProductFilter["LAST_SEEN"] = "last_seen";
    ProductFilter["INTEREST"] = "interest";
})(ProductFilter = exports.ProductFilter || (exports.ProductFilter = {}));
class ProductService {
    static async createProduct(fields) {
        console.log('Fields in create product service: ', fields);
        const user = await ProductModel_1.default.create(fields);
        return user;
    }
    static async createProducts(products) {
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productDB = await this.findProductBySku(product.sku);
            if (!productDB)
                await this.createProduct(product);
        }
    }
    static async updateProducts(products) {
        console.log('Products in update products service: ', products);
        for (let i = 0; i < products.length; i++) {
            const { priceUAH, priceUSD, quantity, category, subCategory, sku, minQuantity, stock } = products[i];
            const productDB = await this.findProductBySku(sku);
            if (productDB)
                await this.updateProduct(productDB._id, { priceUAH, priceUSD, quantity, subCategory, category, minQuantity, stock });
        }
        // const productsDB = await ProductModel.find()
        // for (let i = 0; i < productsDB.length; i++) {
        //     const productDB = productsDB[i]
        //     if (!products.some(p => p.sku === productDB.sku)) await this.delProduct(productDB._id)
        // }
    }
    static async findProductBySku(sku) {
        return await ProductModel_1.default.findOne({ sku });
    }
    static async findProductById(id) {
        return await ProductModel_1.default.findById(id);
    }
    static async updateProduct(id, fields) {
        if (fields.pictures)
            return await ProductModel_1.default.findByIdAndUpdate(id, { ...fields, pictures: [...fields.pictures] }, { new: true });
        return await ProductModel_1.default.findByIdAndUpdate(id, { ...fields }, { new: true });
    }
    static async updateProductImage(product, imageName, main) {
        if (!product.pictures)
            product.pictures = [];
        if (main)
            product.pictures.unshift(imageName);
        else
            product.pictures.push(imageName);
        await product.save();
        return await product.getPublicInfo();
    }
    static async delImage(product, imageName) {
        var _a;
        const filePath = path.join(__dirname, '..', 'images');
        fs.unlink(path.join(filePath, imageName), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`);
            }
        });
        product.pictures = (_a = product.pictures) === null || _a === void 0 ? void 0 : _a.filter(p => p !== imageName);
        await product.save();
        return await product.getPublicInfo();
    }
    static async getProducts() {
        const productsDB = await ProductModel_1.default.find();
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async delProduct(id) {
        var _a;
        const product = await ProductModel_1.default.findByIdAndDelete(id);
        if (!product)
            return null;
        if ((_a = product.pictures) === null || _a === void 0 ? void 0 : _a.length)
            product.pictures.forEach(async (p) => {
                // await this.delImage(product, p)
                const filePath = path.join(__dirname, '..', 'images');
                fs.unlink(path.join(filePath, p), err => {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Error: ${err}`);
                    }
                });
            });
        return product;
    }
    static async checkProductsAndGetCategories() {
        const categories = [];
        const products = await ProductModel_1.default.find();
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (!product.priceUAH && !product.priceUSD) {
                product.hidden = true;
                await product.save();
            }
            if (product.category && !categories.some(c => c.category === product.category))
                categories.push({ category: product.category, id: (0, utils_1.generateRandomNumbers)(6), subcategories: [] });
            if (product.subCategory && product.category) {
                const index = categories.findIndex(c => c.category === product.category);
                if (index !== -1 && !categories[index].subcategories.some(sc => sc.title === product.subCategory))
                    categories[index].subcategories.push({ id: (0, utils_1.generateRandomNumbers)(6), title: product.subCategory });
            }
        }
        return categories;
    }
    static async getFilteredProducts({ search, filter, category, subcategory, limit, userId }) {
        const validUserId = userId && mongodb_1.ObjectId.isValid(userId) ? userId : undefined;
        if (validUserId && filter === ProductFilter.LAST_SEEN)
            return await this.findUserLastSeenProducts(validUserId);
        if (filter === ProductFilter.LAST_SEEN)
            return await this.findAllLastSeenProducts();
        if (filter === ProductFilter.INTEREST)
            return await this.findInterestProducts();
        if (filter === ProductFilter.TOP)
            return await this.findTopProducts();
        if (search && search.length)
            return await this.searchProducts(search, limit);
        let model = {};
        if (subcategory) {
            model = { subCategory: subcategory };
        }
        else if (category)
            model = { category };
        const productsDB = limit ? await ProductModel_1.default.find(model).limit(limit) : await ProductModel_1.default.find(model);
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async findUserLastSeenProducts(userId) {
        var _a;
        const user = await UserServices_1.default.findUserById(userId);
        if (user && ((_a = user.lastSeenProducts) === null || _a === void 0 ? void 0 : _a.length)) {
            const productsDB = await ProductModel_1.default.find({ _id: { $in: user.lastSeenProducts } });
            const promise = productsDB.map(async (p) => await p.getPublicInfo());
            const products = await Promise.all(promise);
            return products;
        }
        else
            return [];
    }
    static async findAllLastSeenProducts() {
        const sortedProducts = [];
        const users = await UserServices_1.default.findAllUsers();
        users.forEach(user => {
            var _a;
            if ((_a = user.lastSeenProducts) === null || _a === void 0 ? void 0 : _a.length) {
                user.lastSeenProducts.forEach(productId => {
                    if (sortedProducts.some(p => p.productId === productId)) {
                        const index = sortedProducts.findIndex(p => p.productId === productId);
                        sortedProducts[index].number = sortedProducts[index].number + 1;
                    }
                    else
                        sortedProducts.push({ productId, number: 1 });
                });
            }
        });
        sortedProducts.sort((a, b) => b.number - a.number);
        const sortedIds = sortedProducts.map(p => p.productId);
        const lastSeenProductsDB = await ProductModel_1.default.find({ _id: { $in: sortedIds } });
        const allProductsDB = await ProductModel_1.default.find();
        const notSeenProductsDB = allProductsDB.filter(allP => {
            if (lastSeenProductsDB.some(seenP => String(seenP._id) === String(allP._id)))
                return false;
            else
                return true;
        });
        const productsDB = [...lastSeenProductsDB, ...notSeenProductsDB];
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async findInterestProducts() {
        const productsDB = await ProductModel_1.default.find();
        const filteredProductsDB = productsDB.filter(p => p.quantity && typeof p.quantity === 'number');
        filteredProductsDB.sort((a, b) => b.quantity - a.quantity);
        const promise = filteredProductsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async findTopProducts() {
        const orderHistory = await OrderService_1.default.getAllOrders();
        const sortedProducts = [];
        orderHistory.forEach(order => {
            var _a;
            if ((_a = order.products) === null || _a === void 0 ? void 0 : _a.length) {
                order.products.forEach(product => {
                    if (sortedProducts.some(p => p.productId === product.product)) {
                        const index = sortedProducts.findIndex(p => p.productId === product.product);
                        sortedProducts[index].number = sortedProducts[index].number + 1;
                    }
                    else
                        sortedProducts.push({ productId: product.product, number: 1 });
                });
            }
        });
        sortedProducts.sort((a, b) => b.number - a.number);
        const sortedIds = sortedProducts.map(p => p.productId);
        const lastSeenProductsDB = await ProductModel_1.default.find({ _id: { $in: sortedIds } });
        const allProductsDB = await ProductModel_1.default.find();
        const notSeenProductsDB = allProductsDB.filter(allP => {
            if (lastSeenProductsDB.some(seenP => String(seenP._id) === String(allP._id)))
                return false;
            else
                return true;
        });
        const productsDB = [...lastSeenProductsDB, ...notSeenProductsDB];
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async getFavoriteProducts(productsId) {
        const productsDB = await ProductModel_1.default.find({ _id: { $in: productsId } });
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
    static async searchProducts(search, limit) {
        const regex = new RegExp(search, 'i');
        const productsDB = limit
            ? await ProductModel_1.default.find({
                $or: [{ name: regex }, { sku: regex }],
            }).limit(limit)
            : await ProductModel_1.default.find({
                $or: [{ name: regex }, { sku: regex }],
            });
        const promise = productsDB.map(async (p) => await p.getPublicInfo());
        const products = await Promise.all(promise);
        return products;
    }
}
exports.ProductService = ProductService;
exports.default = ProductService;
//# sourceMappingURL=ProductServices.js.map