"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controllerWrapper = (ctrl) => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = controllerWrapper;
//# sourceMappingURL=controllerWrapper.js.map