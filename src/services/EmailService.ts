import sgMail from '@sendgrid/mail'
import config from '../config'
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
}
