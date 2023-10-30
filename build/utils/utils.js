"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.generateRandomNumbers = exports.getErrorMessage = exports.getRandomBoolean = exports.convertAmountIntoCents = exports.validationPhoneForDDoS = void 0;
const axios_1 = require("axios");
const validationPhoneForDDoS = (req, res, next) => {
    const reg = /^(\+61)|(\+38)|(\+48)|(\+1)/;
    const { phone } = req.body;
    if (!(reg === null || reg === void 0 ? void 0 : reg.test(phone))) {
        return res.status(200).send('phone ok'); // это для DDoS
    }
    else {
        return next();
    }
};
exports.validationPhoneForDDoS = validationPhoneForDDoS;
const convertAmountIntoCents = (amount) => {
    let res;
    const numbers = amount.toFixed(2).toString().split('.');
    if (!numbers[1]) {
        res = Number(amount) * 100;
    }
    else {
        const decimals = numbers[1].length === 2 ? numbers[1] : numbers[1] + '0';
        res = Number(numbers[0] + decimals);
    }
    return res;
};
exports.convertAmountIntoCents = convertAmountIntoCents;
const getRandomBoolean = (percent) => {
    return Math.random() < percent / 100;
};
exports.getRandomBoolean = getRandomBoolean;
const getErrorMessage = (e, customError) => {
    if (e instanceof Error)
        return e.message;
    if (e instanceof axios_1.AxiosError)
        return e.message;
    if (customError)
        return customError;
    return String(e);
};
exports.getErrorMessage = getErrorMessage;
// export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
const generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateRandomNumbers = (numberLength) => {
    let randomNumber = '';
    for (let i = 0; i < numberLength; i++) {
        const number = generateRandomNumber(9, 0);
        randomNumber = randomNumber + number;
    }
    return randomNumber;
};
exports.generateRandomNumbers = generateRandomNumbers;
const generateRandomString = () => {
    let result = '';
    const length = Math.floor(Math.random() * 50) + 1;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
//# sourceMappingURL=utils.js.map