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
exports.XlsxService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XlsxPopulate = require('xlsx-populate');
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
class XlsxService {
    static async createOrderXlsx(products, userId) {
        const workbook = await XlsxPopulate.fromFileAsync(path_1.default.join(__dirname, '..', 'excel') + '/template.xlsx');
        let row = 4;
        let number = 1;
        let totalWeight = 0;
        let totalUSD = 0;
        let totalUAH = 0;
        products.forEach(product => {
            workbook
                .sheet('Sheet1')
                .cell('A' + row)
                .value(number)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('B' + row)
                .value(product.product.name)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('C' + row)
                .value(product.product.sku)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('D' + row)
                .value(product.product.priceUSD)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('E' + row)
                .value(product.product.priceUAH)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('F' + row)
                .value(product.number)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('G' + row)
                .value(product.number * product.product.priceUSD)
                .style({ border: true });
            workbook
                .sheet('Sheet1')
                .cell('H' + row)
                .value(product.number * product.product.priceUAH)
                .style({ border: true });
            row += 1;
            number += 1;
            totalUSD += product.number * product.product.priceUSD;
            totalUAH += product.number * product.product.priceUAH;
            let weight = 0;
            if (product.product.deliveryOptions && product.product.deliveryOptions.length && product.product.deliveryOptions.some((o) => o.name === 'Вага')) {
                const index = product.product.deliveryOptions.findIndex((o) => o.name === 'Вага');
                weight = Number(product.product.deliveryOptions[index].value.replace(/\D/g, ''));
            }
            else if (product.product.options && product.product.options.length && product.product.options.some((o) => o.name === 'Вага')) {
                const index = product.product.options.findIndex((o) => o.name === 'Вага');
                weight = Number(product.product.options[index].value.replace(/\D/g, ''));
            }
            if (!isNaN(weight)) {
                weight = weight * product.number;
                totalWeight += weight;
            }
        });
        workbook
            .sheet('Sheet1')
            .cell('G' + row)
            .value('Загальна сума $')
            .style({ border: true })
            .style({ border: true });
        workbook
            .sheet('Sheet1')
            .cell('H' + row)
            .value(totalUSD)
            .style({ border: true })
            .style('fill', '808080');
        workbook
            .sheet('Sheet1')
            .cell('G' + (row + 1))
            .value('Загальна сума ₴')
            .style({ border: true });
        workbook
            .sheet('Sheet1')
            .cell('H' + (row + 1))
            .value(totalUAH)
            .style({ border: true })
            .style('fill', '808080');
        workbook
            .sheet('Sheet1')
            .cell('G' + (row + 2))
            .value('Загальна вага')
            .style({ border: true });
        workbook
            .sheet('Sheet1')
            .cell('H' + (row + 2))
            .value(totalWeight)
            .style({ border: true })
            .style('fill', '808080');
        await workbook.toFileAsync(`${path_1.default.join(__dirname, '..', 'excel')}/order${userId ? userId : ''}.xlsx`);
    }
    static async removeXlsx(userId) {
        const filePath = path_1.default.join(path_1.default.join(__dirname, '..', 'excel'));
        fs.unlink(path_1.default.join(filePath, `/order${userId}.xlsx`), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`);
            }
        });
    }
}
exports.XlsxService = XlsxService;
exports.default = XlsxService;
//# sourceMappingURL=XlsxService.js.map