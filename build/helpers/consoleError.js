"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { lgtl } from './../services/LogtailService'
Object.defineProperty(exports, "__esModule", { value: true });
const consoleError = (fnName, message, arg) => {
    // const logMessage = '\x1b[32mFn\x1b[0m: ' + fnName + ' \x1b[31mError message\x1b[0m: ' + message + '\x1b[0m'
    // lgtl.warn(logMessage, {
    //     env: String(process.env?.ENV),
    //     args: arg,
    // })
    console.error(`${fnName} => Error message: ${message}. `, arg);
};
exports.default = consoleError;
//# sourceMappingURL=consoleError.js.map