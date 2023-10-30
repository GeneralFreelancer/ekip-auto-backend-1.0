"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertising = exports.AdvertisingObj = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const config_1 = __importDefault(require("../config"));
class AdvertisingObj {
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], AdvertisingObj.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], AdvertisingObj.prototype, "url", void 0);
exports.AdvertisingObj = AdvertisingObj;
class Advertising {
    getPublicInfo() {
        var _a, _b, _c;
        const desktop = (_a = this.desktop) === null || _a === void 0 ? void 0 : _a.map(d => ({ Image: config_1.default.APP_DOMAIN + '/images/' + d.image, url: d.url }));
        const tablet = (_b = this.tablet) === null || _b === void 0 ? void 0 : _b.map(d => ({ Image: config_1.default.APP_DOMAIN + '/images/' + d.image, url: d.url }));
        const mobile = (_c = this.mobile) === null || _c === void 0 ? void 0 : _c.map(d => ({ Image: config_1.default.APP_DOMAIN + '/images/' + d.image, url: d.url }));
        return {
            desktop,
            tablet,
            mobile,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
__decorate([
    (0, typegoose_1.prop)({ type: AdvertisingObj, required: false, _id: false }),
    __metadata("design:type", Array)
], Advertising.prototype, "desktop", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: AdvertisingObj, required: false, _id: false }),
    __metadata("design:type", Array)
], Advertising.prototype, "tablet", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: AdvertisingObj, required: false, _id: false }),
    __metadata("design:type", Array)
], Advertising.prototype, "mobile", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Advertising.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], Advertising.prototype, "updatedAt", void 0);
exports.Advertising = Advertising;
exports.default = (0, typegoose_1.getModelForClass)(Advertising, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=AdvertisingModel.js.map