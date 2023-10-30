"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const passport_jwt_1 = require("passport-jwt");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const utils_1 = require("./utils");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Super djvjdvU%hx%^78 puersd jsdkfjsdlkfj3242348sdfsdf secrete',
};
const JWTStrategy = new passport_jwt_1.Strategy(opts, async (payload, done) => {
    const d = new Date();
    const currentTimestamp = Math.round(d.getTime() / 1000);
    try {
        const user = await UserModel_1.default.findById(payload.id);
        if (user && payload.exp > currentTimestamp) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        console.log((0, utils_1.getErrorMessage)(error));
    }
});
exports.default = JWTStrategy;
//# sourceMappingURL=passport.js.map