import sgMail from '@sendgrid/mail'
import config from '../config'
import path from 'path'
import * as fs from 'fs'
sgMail.setApiKey(config.SENDGRID_API_KEY as string)

import { consoleError } from '../helpers'
import { getErrorMessage } from '../utils/utils'

export class EmailService {
    static async sendVerificationEmail(userEmail: string, code: string | number) {
        try {
            const msg = {
                to: userEmail, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: 'ekip.auto.production@gmail.com',
                }, // Change to your verified sender
                subject: 'Email verification Ekip-auto',
                text: `Для підтвердження реєстрації на сайті Ekip-auto перейдіть за посиланням: ${config.CLIENT_URL}/confirm-email/${code}`,
            }
            const response = await sgMail.send(msg)
            return response
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendVerificationEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }

    static async sendRequestOrderEmail(userEmail: string, firstName: string, lastName: string, productName: string, sku: string) {
        try {
            const msg = {
                to: userEmail, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: 'ekip.auto.production@gmail.com',
                }, // Change to your verified sender
                subject: 'Product request',
                text: `Користувач ${firstName} ${lastName} зробив запит на товар: ${productName}, арт: ${sku}`,
            }
            const response = await sgMail.send(msg)
            return response
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendVerificationEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }

    static async sendOrderEmail(userEmail: string, firstName: string, lastName: string, userId: string) {
        try {
            const filePath = path.join(__dirname, '..', 'excel') + `/order${userId}.xlsx`
            const attachment = fs.readFileSync(filePath).toString('base64')
            const msg = {
                to: userEmail, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: 'ekip.auto.production@gmail.com',
                }, // Change to your verified sender
                subject: 'Product request',
                // eslint-disable-next-line quotes
                attachments: [
                    {
                        content: attachment,
                        filename: 'order.xlsx',
                        type: 'application/x-excel',
                    },
                ],
            }

            const msgUser = {
                ...msg,
                // eslint-disable-next-line prettier/prettier
                text: 'Дякуємо за замовлення! Найближчим часом з вами зв\'яжеться наш консультант',
            }

            const msgAdmin = {
                ...msg,
                text: `Користувач ${firstName} ${lastName} здійснив замовлення`,
            }

            await sgMail.send(msgUser)
            await sgMail.send(msgAdmin)
            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendOrderEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }
}
