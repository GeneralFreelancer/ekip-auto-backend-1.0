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
exports.AdvertisingService = exports.ImageType = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const AdvertisingModel_1 = __importDefault(require("../models/AdvertisingModel"));
var ImageType;
(function (ImageType) {
    ImageType["DESKTOP"] = "desktop";
    ImageType["TABLET"] = "tablet";
    ImageType["MOBILE"] = "mobile";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
class AdvertisingService {
    static async createAdvertising(fields) {
        return await AdvertisingModel_1.default.create(fields);
    }
    static async getAdvertising() {
        const advertisingArr = await AdvertisingModel_1.default.find();
        if (!advertisingArr || !advertisingArr.length)
            return;
        return advertisingArr[0];
    }
    static async updateAdvertisingImage(advertising, image, imageType) {
        if (imageType === ImageType.DESKTOP) {
            if (advertising.desktop && advertising.desktop.length)
                advertising.desktop.push(image);
            else
                advertising.desktop = [image];
        }
        else if (imageType === ImageType.TABLET) {
            if (advertising.tablet && advertising.tablet.length)
                advertising.tablet.push(image);
            else
                advertising.tablet = [image];
        }
        else if (imageType === ImageType.MOBILE) {
            if (advertising.mobile && advertising.mobile.length)
                advertising.mobile.push(image);
            else
                advertising.mobile = [image];
        }
        await advertising.save();
        return advertising.getPublicInfo();
    }
    static async updateAdvertising(id, fields) {
        return await AdvertisingModel_1.default.findByIdAndUpdate(id, fields, { new: true });
    }
    static async delImage(imageName) {
        var _a, _b, _c;
        const filePath = path.join(__dirname, '..', 'images');
        fs.unlink(path.join(filePath, imageName), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`);
            }
        });
        const advertising = await this.getAdvertising();
        if (!advertising)
            return;
        advertising.desktop = (_a = advertising.desktop) === null || _a === void 0 ? void 0 : _a.filter(p => p.image !== imageName);
        advertising.tablet = (_b = advertising.tablet) === null || _b === void 0 ? void 0 : _b.filter(p => p.image !== imageName);
        advertising.mobile = (_c = advertising.mobile) === null || _c === void 0 ? void 0 : _c.filter(p => p.image !== imageName);
        await advertising.save();
        return advertising;
    }
}
exports.AdvertisingService = AdvertisingService;
exports.default = AdvertisingService;
//# sourceMappingURL=AdvertisingService.js.map