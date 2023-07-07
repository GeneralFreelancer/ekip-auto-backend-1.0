/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XlsxPopulate = require('xlsx-populate')
import path from 'path'
import * as fs from 'fs'

interface IProduct {
    product: any
    number: number
    wight?: number
}

export class XlsxService {
    static async createOrderXlsx(products: IProduct[], userId?: string) {
        const workbook = await XlsxPopulate.fromFileAsync(path.join(__dirname, '..', 'excel') + '/template.xlsx')
        let row = 4
        let number = 1
        let totalWeight = 0
        let totalUSD = 0
        let totalUAH = 0
        products.forEach(product => {
            workbook
                .sheet('Sheet1')
                .cell('A' + row)
                .value(number)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('B' + row)
                .value(product.product.name)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('C' + row)
                .value(product.product.sku)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('D' + row)
                .value(product.product.priceUSD)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('E' + row)
                .value(product.product.priceUAH)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('F' + row)
                .value(product.number)
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('G' + row)
                .value(product.number * (product.product.priceUSD as number))
                .style({ border: true })
            workbook
                .sheet('Sheet1')
                .cell('H' + row)
                .value(product.number * (product.product.priceUAH as number))
                .style({ border: true })
            row += 1
            number += 1
            totalUSD += product.number * (product.product.priceUSD as number)
            totalUAH += product.number * (product.product.priceUAH as number)
            let weight = 0
            if (product.product.deliveryOptions && product.product.deliveryOptions.length && product.product.deliveryOptions.some((o: any) => o.name === 'weight')) {
                const index = product.product.deliveryOptions.findIndex((o: any) => o.name === 'weight')
                weight = Number(product.product.deliveryOptions[index].value)
            } else if (product.product.options && product.product.options.length && product.product.options.some((o: any) => o.name === 'weight')) {
                const index = product.product.options.findIndex((o: any) => o.name === 'weight')
                weight = Number(product.product.options[index].value)
            }
            if (!isNaN(weight)) {
                weight = weight * product.number
                totalWeight += weight
            }
        })
        workbook
            .sheet('Sheet1')
            .cell('G' + row)
            .value('Загальна сума $')
            .style({ border: true })
            .style({ border: true })
        workbook
            .sheet('Sheet1')
            .cell('H' + row)
            .value(totalUSD)
            .style({ border: true })
            .style('fill', '808080')

        workbook
            .sheet('Sheet1')
            .cell('G' + (row + 1))
            .value('Загальна сума ₴')
            .style({ border: true })
        workbook
            .sheet('Sheet1')
            .cell('H' + (row + 1))
            .value(totalUAH)
            .style({ border: true })
            .style('fill', '808080')

        workbook
            .sheet('Sheet1')
            .cell('G' + (row + 2))
            .value('Загальна вага')
            .style({ border: true })
        workbook
            .sheet('Sheet1')
            .cell('H' + (row + 2))
            .value(totalWeight)
            .style({ border: true })
            .style('fill', '808080')
        await workbook.toFileAsync(`${path.join(__dirname, '..', 'excel')}/order${userId ? userId : ''}.xlsx`)
        // XlsxPopulate.fromFileAsync(path.join(__dirname, '..', 'excel') + '/template.xlsx')
        //     .then(async (workbook: any) => {
        //         let row = 4
        //         let number = 1
        //         let totalWeight = 0
        //         let totalUSD = 0
        //         let totalUAH = 0
        //         products.forEach(product => {
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('A' + row)
        //                 .value(number)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('B' + row)
        //                 .value(product.product.name)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('C' + row)
        //                 .value(product.product.sku)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('D' + row)
        //                 .value(product.product.priceUSD)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('E' + row)
        //                 .value(product.product.priceUAH)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('F' + row)
        //                 .value(product.number)
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('G' + row)
        //                 .value(product.number * (product.product.priceUSD as number))
        //                 .style({ border: true })
        //             workbook
        //                 .sheet('Sheet1')
        //                 .cell('H' + row)
        //                 .value(product.number * (product.product.priceUAH as number))
        //                 .style({ border: true })
        //             row += 1
        //             number += 1
        //             totalUSD += product.number * (product.product.priceUSD as number)
        //             totalUAH += product.number * (product.product.priceUAH as number)
        //             let weight = 0
        //             if (product.product.deliveryOptions && product.product.deliveryOptions.length && product.product.deliveryOptions.some((o: any) => o.name === 'weight')) {
        //                 const index = product.product.deliveryOptions.findIndex((o: any) => o.name === 'weight')
        //                 weight = Number(product.product.deliveryOptions[index].value)
        //             } else if (product.product.options && product.product.options.length && product.product.options.some((o: any) => o.name === 'weight')) {
        //                 const index = product.product.options.findIndex((o: any) => o.name === 'weight')
        //                 weight = Number(product.product.options[index].value)
        //             }
        //             if (!isNaN(weight)) {
        //                 weight = weight * product.number
        //                 totalWeight += weight
        //             }
        //         })
        //         workbook
        //             .sheet('Sheet1')
        //             .cell('G' + row)
        //             .value('Загальна сума $')
        //             .style({ border: true })
        //             .style({ border: true })
        //         workbook
        //             .sheet('Sheet1')
        //             .cell('H' + row)
        //             .value(totalUSD)
        //             .style({ border: true })
        //             .style('fill', '808080')

        //         workbook
        //             .sheet('Sheet1')
        //             .cell('G' + (row + 1))
        //             .value('Загальна сума ₴')
        //             .style({ border: true })
        //         workbook
        //             .sheet('Sheet1')
        //             .cell('H' + (row + 1))
        //             .value(totalUAH)
        //             .style({ border: true })
        //             .style('fill', '808080')

        //         workbook
        //             .sheet('Sheet1')
        //             .cell('G' + (row + 2))
        //             .value('Загальна вага')
        //             .style({ border: true })
        //         workbook
        //             .sheet('Sheet1')
        //             .cell('H' + (row + 2))
        //             .value(totalWeight)
        //             .style({ border: true })
        //             .style('fill', '808080')
        //         return workbook
        //     })
        //     .then(async (workbook: any) => {
        //         await workbook.toFileAsync(`${path.join(__dirname, '..', 'excel')}/order${userId ? userId : ''}.xlsx`)
        //     })
    }

    static async removeXlsx(userId: string) {
        const filePath = path.join(path.join(__dirname, '..', 'excel'))
        fs.unlink(path.join(filePath, `/order${userId}.xlsx`), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`)
            }
        })
    }
}

export default XlsxService
