"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleBasedAuth = (roles) => {
    return (req, res, next) => {
        var _a;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.some((r) => roles.includes(r))) {
            return next();
        }
        else {
            return res.status(401).send('User don’t have access to this resource');
        }
    };
};
exports.default = roleBasedAuth;
//# sourceMappingURL=roleBasedAuth.js.map