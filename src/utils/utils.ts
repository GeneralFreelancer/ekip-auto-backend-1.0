import { AxiosError } from 'axios'
import { Request, Response, NextFunction } from 'express'
import { AccountBalance } from 'plaid'

export const validationPhoneForDDoS = (req: Request, res: Response, next: NextFunction) => {
    const reg = /^(\+61)|(\+38)|(\+48)|(\+1)/

    const { phone } = req.body

    if (!reg?.test(phone)) {
        return res.status(200).send('phone ok') // это для DDoS
    } else {
        return next()
    }
}

export const convertAmountIntoCents = (amount: number) => {
    let res
    const numbers = amount.toFixed(2).toString().split('.')

    if (!numbers[1]) {
        res = Number(amount) * 100
    } else {
        const decimals = numbers[1].length === 2 ? numbers[1] : numbers[1] + '0'
        res = Number(numbers[0] + decimals)
    }

    return res
}

export const convertBalancesIntoCents = (balances: AccountBalance) => {
    const { available, current, limit } = balances

    const availableCents = available ? convertAmountIntoCents(available) : available
    const currentCents = current ? convertAmountIntoCents(current) : current
    const limitCents = limit ? convertAmountIntoCents(limit) : limit

    const balancesCents = {
        ...balances,
        available: availableCents,
        current: currentCents,
        limit: limitCents,
    }

    return balancesCents as AccountBalance
}

export const getRandomBoolean = (percent: number) => {
    return Math.random() < percent / 100
}

export const getErrorMessage = (e: unknown, customError?: string) => {
    if (e instanceof Error) return e.message
    if (e instanceof AxiosError) return e.message
    if (customError) return customError
    return String(e)
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const generateRandomNumber = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateRandomNumbers = (numberLength: number) => {
    let randomNumber = ''

    for (let i = 0; i < numberLength; i++) {
        const number = generateRandomNumber(9, 0)
        randomNumber = randomNumber + number
    }

    return randomNumber
}

export const generateRandomString = () => {
    let result = ''
    const length = Math.floor(Math.random() * 50) + 1
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
