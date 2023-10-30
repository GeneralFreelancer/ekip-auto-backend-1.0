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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.LivingAddress = exports.UserRoles = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "USER";
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["TESTER"] = "TESTER";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
class LivingAddress {
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LivingAddress.prototype, "street", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LivingAddress.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LivingAddress.prototype, "additionalInfo", void 0);
exports.LivingAddress = LivingAddress;
class User {
    getPublicInfo() {
        const user = {
            id: String(this._id),
            secondName: this.secondName,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            livingAddress: this.livingAddress,
            isEmailConfirmed: this.isEmailConfirmed,
            roles: this.roles,
            codeToVerifyEmail: this.codeToVerifyEmail,
            favoriteProducts: this.favoriteProducts,
            lastSeenProducts: this.lastSeenProducts,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
        return user;
    }
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: LivingAddress, required: false, _id: false }),
    __metadata("design:type", LivingAddress)
], User.prototype, "livingAddress", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, unique: true, sparse: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: false, unique: true, sparse: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false, required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailConfirmed", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, enum: UserRoles, required: true }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: String }),
    __metadata("design:type", String)
], User.prototype, "codeToVerifyEmail", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array, required: false, allowMixed: typegoose_1.Severity.ALLOW }),
    __metadata("design:type", Array)
], User.prototype, "favoriteProducts", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array, required: false, allowMixed: typegoose_1.Severity.ALLOW }),
    __metadata("design:type", Array)
], User.prototype, "lastSeenProducts", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User;
exports.default = (0, typegoose_1.getModelForClass)(User, {
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=UserModel.js.map