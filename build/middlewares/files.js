"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils/utils");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, path_1.default.join(__dirname, '..', 'images'));
    },
    filename(req, file, cb) {
        cb(null, (0, utils_1.generateRandomNumbers)(6) + '_' + file.originalname);
    },
});
// const types = [
//     'image/png',
//     'image/jpeg',
//     'image/jpg',
//     'application/pdf',
//     'application/vnd.ms-excel',
//     'application/vnd.openxmlformats-',
//     'officedocument.spreadsheetml.sheet',
//     'text/plain',
//     'application/msword',
//     'application/vnd.openxmlformats-',
//     'officedocument.wordprocessingml.document',
// ]
const fileFilter = (req, file, cb) => {
    if (!file || file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx|txt|xls|xlsx|rtf)$/)) {
        cb(null, true);
    }
    else
        cb(null, false);
};
exports.default = (0, multer_1.default)({ storage, fileFilter });
//# sourceMappingURL=files.js.map