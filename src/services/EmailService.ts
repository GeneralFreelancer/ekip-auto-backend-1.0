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
                    email: config.SG_EMAIL,
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

    static async sendRequestOrderEmail(userEmail: string, firstName: string, lastName: string, phone: string, productName: string, sku: string) {
        try {
            const msg = {
                to: config.SG_EMAIL, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: config.SG_EMAIL,
                }, // Change to your verified sender
                subject: 'Product request',
                text: `Користувач ${firstName} ${lastName}, телефон: ${phone} зробив запит на товар: ${productName}, арт: ${sku}`,
            }
            const response = await sgMail.send(msg)
            return response
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendVerificationEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }

    static async sendOrderEmail(
        userEmail: string,
        firstName: string,
        lastName: string,
        phone?: string,
        livingAddress?: { city?: string; street?: string; additionalInfo?: string },
        comment?: string,
        userId?: string,
    ) {
        try {
            const filePath = path.join(__dirname, '..', 'excel') + `/order${userId}.xlsx`
            const attachment = fs.readFileSync(filePath).toString('base64')
            const msg = {
                to: userEmail, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: config.SG_EMAIL,
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
                to: config.SG_EMAIL,
                html: `Користувач <strong>${firstName} ${lastName}</strong> здійснив замовлення.<br> Дані користувача:<br> Місто: ${livingAddress?.city} <br> Адреса: ${
                    livingAddress?.street
                }<br> ${livingAddress?.additionalInfo ? `Додаткова інформація: ${livingAddress?.additionalInfo}<br>` : ''} Телефон: ${phone}<br> ${
                    comment ? `Коментарій: ${comment}` : ''
                }`,
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

    static async sendPhone(phone: string) {
        try {
            const msg = {
                to: config.SG_EMAIL, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: config.SG_EMAIL,
                }, // Change to your verified sender
                subject: 'Request call',
                text: `Користувач замовив зворотній дзвінок за номером: ${phone}`,
            }
            const response = await sgMail.send(msg)
            return response
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendPhone', errorMessage, { phone })
            return errorMessage
        }
    }

    static async sendPartnerEmail(userEmail: string, firstName: string, lastName: string, phone: string, message: string, file?: string) {
        try {
            let attachments = undefined
            let filePath = ''
            if (file) {
                filePath = path.join(__dirname, '..', 'images') + `/${file}`
                const attachment = fs.readFileSync(filePath).toString('base64')
                const type = this.getFileType(file)
                attachments = [
                    {
                        content: attachment,
                        filename: file,
                        type,
                    },
                ]
            }
            const msg = {
                to: config.SG_EMAIL, // Change to your recipient
                from: {
                    name: 'Ekip-auto',
                    email: config.SG_EMAIL,
                }, // Change to your verified sender
                subject: 'Partner email',
                html: `Повідомлення від партнера: <strong>${firstName} ${lastName}</strong>, телефон: ${phone}, пошта: ${userEmail}<br> ${message}`,
                attachments,
            }

            await sgMail.send(msg)

            if (file)
                fs.unlink(filePath, err => {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Error: ${err}`)
                    }
                })

            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            consoleError('EmailService.sendOrderEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }

    static getFileType(file: string) {
        let fileType = ''

        if (file.match(/\.(jpg)$/)) fileType = 'image/jpg'
        else if (file.match(/\.(jpeg)$/)) fileType = 'image/jpeg'
        else if (file.match(/\.(png)$/)) fileType = 'image/png'
        else if (file.match(/\.(pdf)$/)) fileType = 'application/pdf'
        else if (file.match(/\.(xls)$/)) fileType = 'application/vnd.ms-excel'
        else if (file.match(/\.(xlsx)$/)) fileType = 'application/vnd.openxmlformats-'
        else if (file.match(/\.(rtf)$/)) fileType = 'application/rtf'
        else if (file.match(/\.(doc)$/)) fileType = 'application/msword'
        else if (file.match(/\.(docx)$/)) fileType = 'officedocument.wordprocessingml.document'
        else if (file.match(/\.(txt)$/)) fileType = 'text/plain'

        return fileType
    }
}
