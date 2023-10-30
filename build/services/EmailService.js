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
exports.EmailService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../config"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
mail_1.default.setApiKey(config_1.default.SENDGRID_API_KEY);
const helpers_1 = require("../helpers");
const utils_1 = require("../utils/utils");
class EmailService {
    static async sendVerificationEmail(userEmail, code) {
        try {
            const msg = {
                to: userEmail,
                from: {
                    name: 'Ekip-auto',
                    email: config_1.default.SG_EMAIL,
                },
                subject: 'Email verification Ekip-auto',
                text: `Для підтвердження реєстрації на сайті Ekip-auto перейдіть за посиланням: ${config_1.default.CLIENT_URL}/confirm-email/${code}`,
            };
            const response = await mail_1.default.send(msg);
            return response;
        }
        catch (error) {
            const errorMessage = (0, utils_1.getErrorMessage)(error);
            (0, helpers_1.consoleError)('EmailService.sendVerificationEmail', errorMessage, { userEmail });
            return errorMessage;
        }
    }
    static async sendRequestOrderEmail(userEmail, firstName, lastName, phone, productName, sku) {
        try {
            const msg = {
                to: config_1.default.SG_EMAIL,
                from: {
                    name: 'Ekip-auto',
                    email: config_1.default.SG_EMAIL,
                },
                subject: 'Product request',
                text: `Користувач ${firstName} ${lastName}, телефон: ${phone} зробив запит на товар: ${productName}, арт: ${sku}`,
            };
            const response = await mail_1.default.send(msg);
            return response;
        }
        catch (error) {
            const errorMessage = (0, utils_1.getErrorMessage)(error);
            (0, helpers_1.consoleError)('EmailService.sendVerificationEmail', errorMessage, { userEmail });
            return errorMessage;
        }
    }
    static async sendOrderEmail(userEmail, firstName, lastName, phone, livingAddress, comment, userId) {
        try {
            const filePath = path_1.default.join(__dirname, '..', 'excel') + `/order${userId}.xlsx`;
            const attachment = fs.readFileSync(filePath).toString('base64');
            const msg = {
                to: userEmail,
                from: {
                    name: 'Ekip-auto',
                    email: config_1.default.SG_EMAIL,
                },
                subject: 'Product request',
                // eslint-disable-next-line quotes
                attachments: [
                    {
                        content: attachment,
                        filename: 'order.xlsx',
                        type: 'application/x-excel',
                    },
                ],
            };
            const msgUser = {
                ...msg,
                // eslint-disable-next-line prettier/prettier
                text: 'Дякуємо за замовлення! Найближчим часом з вами зв\'яжеться наш консультант',
            };
            const msgAdmin = {
                ...msg,
                to: config_1.default.SG_EMAIL,
                html: `Користувач <strong>${firstName} ${lastName}</strong> здійснив замовлення.<br> Дані користувача:<br> Місто: ${livingAddress === null || livingAddress === void 0 ? void 0 : livingAddress.city} <br> Адреса: ${livingAddress === null || livingAddress === void 0 ? void 0 : livingAddress.street}<br> ${(livingAddress === null || livingAddress === void 0 ? void 0 : livingAddress.additionalInfo) ? `Додаткова інформація: ${livingAddress === null || livingAddress === void 0 ? void 0 : livingAddress.additionalInfo}<br>` : ''} Телефон: ${phone}<br> ${comment ? `Коментарій: ${comment}` : ''}`,
            };
            await mail_1.default.send(msgUser);
            await mail_1.default.send(msgAdmin);
            return true;
        }
        catch (error) {
            const errorMessage = (0, utils_1.getErrorMessage)(error);
            (0, helpers_1.consoleError)('EmailService.sendOrderEmail', errorMessage, { userEmail });
            return errorMessage;
        }
    }
    static async sendPhone(phone) {
        try {
            const msg = {
                to: config_1.default.SG_EMAIL,
                from: {
                    name: 'Ekip-auto',
                    email: config_1.default.SG_EMAIL,
                },
                subject: 'Request call',
                text: `Користувач замовив зворотній дзвінок за номером: ${phone}`,
            };
            const response = await mail_1.default.send(msg);
            return response;
        }
        catch (error) {
            const errorMessage = (0, utils_1.getErrorMessage)(error);
            (0, helpers_1.consoleError)('EmailService.sendPhone', errorMessage, { phone });
            return errorMessage;
        }
    }
    static async sendPartnerEmail(userEmail, firstName, lastName, phone, message, file) {
        try {
            let attachments = undefined;
            let filePath = '';
            if (file) {
                filePath = path_1.default.join(__dirname, '..', 'images') + `/${file}`;
                const attachment = fs.readFileSync(filePath).toString('base64');
                const type = this.getFileType(file);
                attachments = [
                    {
                        content: attachment,
                        filename: file,
                        type,
                    },
                ];
            }
            const msg = {
                to: config_1.default.SG_EMAIL,
                from: {
                    name: 'Ekip-auto',
                    email: config_1.default.SG_EMAIL,
                },
                subject: 'Partner email',
                html: `Повідомлення від партнера: <strong>${firstName} ${lastName}</strong>, телефон: ${phone}, пошта: ${userEmail}<br> ${message}`,
                attachments,
            };
            await mail_1.default.send(msg);
            if (file)
                fs.unlink(filePath, err => {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Error: ${err}`);
                    }
                });
            return true;
        }
        catch (error) {
            const errorMessage = (0, utils_1.getErrorMessage)(error);
            (0, helpers_1.consoleError)('EmailService.sendOrderEmail', errorMessage, { userEmail });
            return errorMessage;
        }
    }
    static getFileType(file) {
        let fileType = '';
        if (file.match(/\.(jpg)$/))
            fileType = 'image/jpg';
        else if (file.match(/\.(jpeg)$/))
            fileType = 'image/jpeg';
        else if (file.match(/\.(png)$/))
            fileType = 'image/png';
        else if (file.match(/\.(pdf)$/))
            fileType = 'application/pdf';
        else if (file.match(/\.(xls)$/))
            fileType = 'application/vnd.ms-excel';
        else if (file.match(/\.(xlsx)$/))
            fileType = 'application/vnd.openxmlformats-';
        else if (file.match(/\.(rtf)$/))
            fileType = 'application/rtf';
        else if (file.match(/\.(doc)$/))
            fileType = 'application/msword';
        else if (file.match(/\.(docx)$/))
            fileType = 'officedocument.wordprocessingml.document';
        else if (file.match(/\.(txt)$/))
            fileType = 'text/plain';
        return fileType;
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map