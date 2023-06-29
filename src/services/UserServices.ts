import mongoose, { Types } from 'mongoose'
import { getErrorMessage } from './../utils/utils'
import { DocumentType } from '@typegoose/typegoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel, { User, UserRole } from '../models/UserModel'
import { consoleError } from '../helpers'

export class UserService {
    static async findAll() {
        const users = await UserModel.find({})
        return users
    }

    static async getAllUsers(skip: number, limit: number, searchQuery?: string): Promise<DocumentType<User>[]> {
        let model

        if (!searchQuery) model = {}
        else
            model = {
                $and: [
                    {
                        $or: [
                            { firstName: new RegExp(searchQuery, 'i') },
                            { lastName: new RegExp(searchQuery, 'i') },
                            { preferredName: new RegExp(searchQuery, 'i') },
                            { email: new RegExp(searchQuery, 'i') },
                            { phone: new RegExp(searchQuery, 'i') },
                        ],
                    },
                ],
            }

        const result = await UserModel.aggregate([
            { $match: { ...model } },
            {
                $facet: {
                    stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
                    stage2: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
                },
            },
            { $unwind: '$stage1' },
            {
                $project: {
                    totalCount: '$stage1.count',
                    users: '$stage2',
                },
            },
        ])

        return result[0]
    }

    static async createUser(fields: Partial<User>) {
        const user = await UserModel.create({ ...fields, roles: fields.roles ? fields.roles : [UserRole.USER] })
        return user
    }

    static signToken(user: DocumentType<User>, expiration?: number) {
        let expiresIn = 3600 * 24 * 30
        const isProvider = false

        if (user.roles.find((r: UserRole) => r === UserRole.ADMIN)) expiresIn = 3600 * 4
        // if (user.roles.find((r: UserRoles) => r === UserRoles.LENDER)) isProvider = true
        if (expiration) expiresIn = expiration

        const payload = {
            id: user._id,
            isProvider: isProvider,
        }

        const token = jwt.sign(payload, 'Super djvjdvU%hx%^78 puersd jsdkfjsdlkfj3242348sdfsdf secrete', { expiresIn })
        return token
    }

    static async setHashedPasswordToUserModel(password: string) {
        return await bcrypt.hash(password.trim(), 10)
    }

    static async findUserByPhone(phone: string) {
        return await UserModel.findOne({ phone })
    }

    static async findUserByEmailCode(code: string) {
        return await UserModel.findOne({ codeToVerifyEmail: code })
    }

    static async findUserByPhoneOrEmail(phone: string, email: string) {
        return await UserModel.find({ $or: [{ phone }, { email }] })
    }

    static async findUserByEmail(email: string) {
        const user = await UserModel.findOne({ email })
        return user
    }

    static async findUserById(id: string | Types.ObjectId) {
        const user = await UserModel.findOne({ _id: id })
        return user
    }

    static async deleteUser(userId: mongoose.Types.ObjectId) {
        try {
            // const isDev = process.argv.some(a => a === 'dev')
            // if (isDev && userId) {
            //     await AccountModel.deleteMany({ user: userId })
            //     await EnrollmentModel.deleteMany({ userId })
            //     await LoanModel.deleteMany({ user: userId })
            //     await NotificationModel.deleteMany({ user: userId })
            //     await PaymentModel.deleteMany({ user: userId })
            //     await RecommendationModel.deleteMany({ userId })
            //     await RecurringPaymentModel.deleteMany({ user: userId })
            //     await RoundUpModel.deleteMany({ user: userId })
            //     await LiabilityModel.deleteMany({ user: userId })
            //     await DebtReliefAssessmentModel.deleteMany({ user: userId })
            //     await CreditReportModel.deleteMany({ user: userId })
            // }
            return await UserModel.findOneAndDelete({ _id: userId })
        } catch (error) {
            consoleError('MethodServices.deleteUser', getErrorMessage(error))
            return
        }
    }
}

export default UserService
