/* eslint-disable @typescript-eslint/no-explicit-any */
import sgMail from '@sendgrid/mail'
import config from '../config'
// const sendGridApiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(config.SENDGRID_API_KEY as string)

// import { addMonths, format } from 'date-fns'
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
                subject: 'Email verification',
                text: `Follow the link to verify your email: ${config.CLIENT_URL}/${code}`,
            }
            const response = await sgMail.send(msg)
            return response
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            // console.log(error.response.body)
            consoleError('EmailService.sendVerificationEmail', errorMessage, { userEmail })
            return errorMessage
        }
    }
}
