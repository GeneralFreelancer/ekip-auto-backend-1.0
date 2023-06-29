import { DocumentType } from '@typegoose/typegoose'
import { User as IUser, UserRoles } from '../models/UserModel'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'

declare global {
    export namespace Express {
        export interface User extends DocumentType<IUser> {
            id: string
        }
        export interface Request {
            pagination: {
                skip: number
                limit: number
            }
        }
    }
}

declare module 'passport' {
    export interface AuthenticateOptions {
        role?: UserRoles
    }
}

export interface IAuthRequest {
    email: string
    password: string
}
