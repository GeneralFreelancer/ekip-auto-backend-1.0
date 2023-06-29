import rateLimiter from 'express-rate-limit'

const limiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})

export const fifteenMinutesLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 100 requests per windowMs
})

export default limiter
