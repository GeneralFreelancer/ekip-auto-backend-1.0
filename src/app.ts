import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Response, Request, NextFunction, ErrorRequestHandler } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoose, { ConnectOptions } from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'
import apiRoutes from './api'
import JWTAuthStrategy from './utils/passport'
import config from './config'
import { SendError } from './helpers'
import path from 'path'

const app = express()

//Rate Limiter
app.set('trust proxy', 2)
app.get('/ip', (request, response) => response.send(request.ip))
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use('/', apiLimiter)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))

app.use(
    morgan(function (tokens, req, res) {
        return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), '-', tokens['response-time'](req, res), 'ms'].join(' ')
    }),
)
app.use(helmet())

// const origin =
//     process.env.ENV === 'DEV'
//         ? [
//               'http://localhost:3000',
//               'http://localhost:3500',
//               'http://localhost:8080',
//               'http://localhost:4242',
//               'http://localhost:5050',
//               'http://localhost:8090',
//               /app\.dev\.lever\.com\.au$/,
//               /.*/,
//           ]
//         : ['http://localhost:3000', /app\.lever\.com\.au$/, /.*/]

// if (process.env.ENV === 'STAGE') origin.push('/app.stage.lever.com.au$/')

// app.use(
//     cors({
//         origin: origin,
//     }),
// )
app.use(cors())

// app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction): void => {
    if (req.originalUrl === '/stripe/stripe-wh') {
        next()
    } else if (req.originalUrl === '/stripe/stripe-wh-one-time-payment') {
        next()
    } else {
        bodyParser.json()(req, res, next)
    }
})

// Connect to Mongo DB
mongoose.set('strictQuery', false)
mongoose
    .connect(config.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'ekip_auto_DB',
    } as ConnectOptions)
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('MongoDB Connected...')
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log('Mongoose error: ', err))

//Authorization
passport.use(JWTAuthStrategy)
passport.use(new AnonymousStrategy())

// Routes
app.use(apiRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/excel', express.static(path.join(__dirname, 'excel')))
app.set('view engine', 'ejs')

// Unmatched routes
app.all('*', (req, res) => SendError.NOT_FOUND(res, 'Ohh you are lost, read the API documentation to find your way back home :)'))

const errorHandler: ErrorRequestHandler = (err, req, res, _next): void => {
    const { status = 500, message = 'Sever error' } = err
    res.status(status).json({ code: status, success: false, message })
}

app.use(errorHandler)

const port = config.PORT
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Test CI/CD. Server runs on the port ${port}. Env : ${process.env.ENV}`))
