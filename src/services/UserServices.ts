import mongoose, { Types } from 'mongoose'
import { getErrorMessage } from './../utils/utils'
import { DocumentType } from '@typegoose/typegoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel, { User, UserRoles } from '../models/UserModel'
import { consoleError } from '../helpers'

export class UserService {
    static async createUser(fields: Partial<User>) {
        const user = await UserModel.create({ ...fields, roles: fields.roles ? fields.roles : [UserRoles.USER] })
        return user
    }

    static signToken(user: DocumentType<User>, expiration?: number) {
        let expiresIn = 3600 * 24 * 30
        const isProvider = false

        if (user.roles.find((r: UserRoles) => r === UserRoles.ADMIN)) expiresIn = 3600 * 4
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

    static async findAllUsers() {
        return await UserModel.find()
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
            return await UserModel.findOneAndDelete({ _id: userId })
        } catch (error) {
            consoleError('MethodServices.deleteUser', getErrorMessage(error))
            return
        }
    }

    static async updateFavoriteProducts(user: DocumentType<User>, productId: string) {
        if (!user.favoriteProducts || !user.favoriteProducts.length) user.favoriteProducts = [productId]
        else {
            if (user.favoriteProducts.includes(productId)) user.favoriteProducts = user.favoriteProducts.filter(p => p !== productId)
            else user.favoriteProducts.unshift(productId)
        }
        await user.save()
        return user.getPublicInfo()
    }

    static async updateLastSeenProducts(user: DocumentType<User>, productId: string) {
        if (!user.lastSeenProducts || !user.lastSeenProducts.length) user.lastSeenProducts = [productId]
        else if (!user.lastSeenProducts.includes(productId)) user.lastSeenProducts.unshift(productId)
        await user.save()
        return user.getPublicInfo()
    }
}

export default UserService
