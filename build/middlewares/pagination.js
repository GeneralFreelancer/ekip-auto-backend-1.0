"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = () => {
    return (req, res, next) => {
        const { page, limit } = req.query;
        const pageInt = page ? parseInt(page.toString()) : 1;
        const limitInt = limit ? parseInt(limit.toString()) : 10;
        const skip = (pageInt - 1) * limitInt;
        req.pagination = { skip, limit: limitInt };
        next();
    };
};
exports.default = pagination;
//# sourceMappingURL=pagination.js.map