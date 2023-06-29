import { DocumentType, getModelForClass, prop, Severity } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    TESTER = 'TESTER',
}

export class LivingAddress {
    @prop({ type: String, required: true }) public street!: string
    @prop({ type: String, required: false }) public city!: string
    @prop({ type: String, required: false }) public additionalInfo?: string
}

export interface PublicUser extends Partial<User> {
    id: string
}

export interface IUser extends User {
    _id: ObjectId
}

export class User {
    @prop({ type: String, required: false })
    public firstName?: string

    @prop({ type: String, required: false })
    public secondName?: string

    @prop({ type: String, required: false })
    public lastName?: string

    @prop({ type: LivingAddress, required: false, _id: false })
    public livingAddress?: LivingAddress

    @prop({ type: String, required: true, unique: true, sparse: true })
    public email!: string

    @prop({ type: String, required: false, unique: true, sparse: true })
    public phone?: string

    @prop({ default: false, required: false, type: Boolean })
    public isEmailConfirmed?: boolean

    @prop({ type: String, enum: UserRole, required: true })
    public roles!: UserRole[]

    @prop({ required: true, type: String })
    public password!: string

    @prop({ required: false, type: String })
    public codeToVerifyEmail?: string

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public favoriteGoods?: string[]

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public lastSeenGoods?: string[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    getPublicInfo(this: DocumentType<User>) {
        const user: PublicUser = {
            id: String(this._id),
            secondName: this.secondName,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            livingAddress: this.livingAddress,
            isEmailConfirmed: this.isEmailConfirmed,
            roles: this.roles,
            codeToVerifyEmail: this.codeToVerifyEmail,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
        return user
    }
}

export default getModelForClass(User, {
    schemaOptions: {
        timestamps: true,
    },
})
