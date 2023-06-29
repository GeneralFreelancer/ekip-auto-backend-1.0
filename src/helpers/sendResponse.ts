/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

type TypeSendResponse = {
    OK: (res: Response, message: string, data?: any) => void
    CREATED: (res: Response, message: string, data?: any) => void
    ACCEPTED: (res: Response, message: string, data?: any) => void
}

export const SendResponse: TypeSendResponse = {
    OK: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(200).json({
            code: 200,
            success: true,
            message,
            ...data,
        })
    },

    CREATED: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(201).json({
            code: 201,
            success: true,
            message,
            ...data,
        })
    },

    ACCEPTED: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(202).json({
            code: 202,
            success: true,
            message,
            ...data,
        })
    },
}

type TypeSendError = {
    BAD_REQUEST: (res: Response, message: string, data?: any) => void
    UNAUTHORIZED: (res: Response, message: string, data?: any) => void
    FORBIDDEN: (res: Response, message: string) => void
    NOT_FOUND: (res: Response, message: string, data?: any) => void
    NOT_ACCEPTABLE: (res: Response, message: string) => void
    CONFLICT: (res: Response, message: string, data?: any) => void
    SERVER_ERROR: (res: Response, message: string) => void
}

export const SendError: TypeSendError = {
    BAD_REQUEST: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(400).json({
            code: 400,
            success: false,
            message,
            ...data,
        })
    },

    UNAUTHORIZED: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(401).json({
            code: 401,
            success: false,
            message,
            ...data,
        })
    },

    FORBIDDEN: (res, message) => {
        res.locals.responseMessage = message
        return res.status(403).json({
            code: 403,
            success: false,
            message,
        })
    },

    NOT_FOUND: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(404).json({
            code: 404,
            success: false,
            message,
            ...data,
        })
    },

    NOT_ACCEPTABLE: (res, message) => {
        res.locals.responseMessage = message
        return res.status(406).json({
            code: 406,
            success: false,
            message,
        })
    },

    CONFLICT: (res, message, data) => {
        res.locals.responseMessage = message
        return res.status(409).json({
            code: 409,
            success: false,
            message,
            ...data,
        })
    },

    SERVER_ERROR: (res, message) => {
        res.locals.responseMessage = message
        return res.status(500).json({
            code: 500,
            success: false,
            message,
        })
    },
}
