/* eslint-disable @typescript-eslint/no-explicit-any */
import sgMail from '@sendgrid/mail'
const sendGridApiKey = process.env.SENDGRID_API_KEY
if (sendGridApiKey) sgMail.setApiKey(sendGridApiKey)
// import config from '../config'
// import { addMonths, format } from 'date-fns'
// import { consoleError } from '../helpers'
// import { getErrorMessage } from '../utils/utils'

export interface IAdditionalDataForEmail {
    lenderId?: string
    fullName: string
    accountNumber: string
    nameOfLetter: string
    lenderName: string
    answerId: string
    isLenderActivated: boolean
}

export interface ISendInviteData {
    lenderName: string
    linkInvite: string
    userName?: string
    userLastName?: string
    accountNumber: string
    amountOfDebt?: number
}

export interface ISendUserNotification {
    user_first_name: string | undefined
    lender_name: string | undefined
    user_account_number: string | undefined
    outstanding_amount: string | undefined
}

// const link = `https://${config.APP_DOMAIN}`
// const linkOnProviderApp = `https://${config.APP_DOMAIN_PROVIDER}`

export class EmailService {
    // static async sendEmail(emailTemplate: any, recipientEmailAddress: string, additionalDataForEmail: IAdditionalDataForEmail, signatureFile?: any, isHiddenCopy?: boolean) {
    //     try {
    //         const msg: {
    //             to: string
    //             from: { name: string; email: string }
    //             html: any
    //             attachments: any
    //             template_id: string
    //             dynamic_template_data: any
    //             custom_args?: { answerId: string }
    //         } = {
    //             to: recipientEmailAddress, // Change to your recipient
    //             from: {
    //                 name: `${additionalDataForEmail?.fullName} via Lever`,
    //                 email: 'consumers@lever.com.au',
    //             }, // Change to your verified sender
    //             html: emailTemplate,
    //             template_id: 'd-34384f40512e4ce4b2094c533e4d55fb',
    //             attachments: signatureFile ? signatureFile : '',
    //             custom_args: {
    //                 answerId: `${additionalDataForEmail.answerId}`,
    //             },
    //             dynamic_template_data: {
    //                 lenderName: `${additionalDataForEmail?.lenderName}`,
    //                 subject: `${additionalDataForEmail?.fullName} made a ${additionalDataForEmail?.nameOfLetter} Offer for account ${additionalDataForEmail?.accountNumber}`,
    //                 accountNumber: `${additionalDataForEmail?.accountNumber}`,
    //                 letterName: `${additionalDataForEmail?.nameOfLetter}`,
    //                 answerId: `${additionalDataForEmail?.answerId}`,
    //                 link: additionalDataForEmail?.isLenderActivated
    //                     ? `${linkOnProviderApp}/negotiation/${additionalDataForEmail.answerId}`
    //                     : `${link}/creditor/${additionalDataForEmail?.answerId}?lenderId=${additionalDataForEmail.lenderId}`,
    //                 emailRecipient: `${recipientEmailAddress}`,
    //                 fullName: `${additionalDataForEmail?.fullName}`,
    //             },
    //         }
    //         if (isHiddenCopy) {
    //             delete msg.custom_args
    //         }
    //         const response = await sgMail.send(msg)
    //         return response
    //     } catch (e) {
    //         const errorMessage = getErrorMessage(e)
    //         consoleError('EmailService.sendEmail', errorMessage, { emailTemplate, recipientEmailAddress, additionalDataForEmail, signatureFile, isHiddenCopy })
    //         return errorMessage
    //     }
    // }
    // static async sendEmailToUserWithStatus(recipientEmailAddress: string, lenderName: string, letterName: string, offerStatus: string, explanation?: string) {
    //     let explanationLine = ''
    //     if (explanation) explanationLine = `Provider explain his propose: ${explanation}`
    //     try {
    //         const msg = {
    //             to: recipientEmailAddress, // Change to your recipient
    //             from: {
    //                 name: `${lenderName} via Lever`,
    //                 email: 'consumers@lever.com.au',
    //             }, // Change to your verified sender
    //             subject: `Your ${letterName} Offer was ${offerStatus} by ${lenderName}`,
    //             text: `Your ${letterName} Offer was ${offerStatus} by ${lenderName}. ${explanationLine}`,
    //         }
    //         const response = await sgMail.send(msg)
    //         return response
    //     } catch (error) {
    //         const errorMessage = getErrorMessage(error)
    //         consoleError('EmailService.sendEmailToUserWithStatus', errorMessage, { recipientEmailAddress, lenderName, letterName, offerStatus, explanation })
    //         return errorMessage
    //     }
    // }
    // static async sendWelcomeLetterToUser(recipientEmailAddress: string) {
    //     try {
    //         const msg = {
    //             to: recipientEmailAddress, // Change to your recipient
    //             from: { name: 'Lever', email: 'consumers@lever.com.au' }, // Change to your verified sender
    //             subject: 'Welcome to Lever!',
    //             template_id: 'd-3aec8e72a2fa4ab597c16e84e87edfce',
    //             html: 'A',
    //             dynamic_template_data: {
    //                 link: `${link}`,
    //                 emailRecipient: `${recipientEmailAddress}`,
    //             },
    //         }
    //         const response = await sgMail.send(msg)
    //         return response
    //     } catch (e) {
    //         const errorMessage = getErrorMessage(e)
    //         consoleError('EmailService.sendWelcomeLetterToUser', errorMessage, { recipientEmailAddress })
    //         return errorMessage
    //     }
    // }
    // static async notificationUsersIfNoActionTheyDid(recipientEmailAddress: string) {
    //     try {
    //         const msg = {
    //             to: recipientEmailAddress, // Change to your recipient
    //             from: { name: 'Lever', email: 'consumers@lever.com.au' }, // Change to your verified sender
    //             subject: 'It so easy to negotiate a debt on terms that works for you',
    //             html: 'Ab',
    //             template_id: 'd-3f414363c2014e4281ee5d27fd678ca9',
    //             dynamic_template_data: {
    //                 link: `${link}`,
    //                 emailRecipient: `${recipientEmailAddress}`,
    //             },
    //         }
    //         const response = await sgMail.send(msg)
    //         return response
    //     } catch (e) {
    //         const errorMessage = getErrorMessage(e)
    //         consoleError('EmailService.notificationUsersIfNoActionTheyDid', errorMessage, { recipientEmailAddress })
    //         return errorMessage
    //     }
    // }
}
