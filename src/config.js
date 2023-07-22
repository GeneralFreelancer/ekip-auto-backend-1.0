/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv')

let envFilePath = ''
let isLocal = false
if (process.argv.some(a => a === 'dev')) envFilePath = '.env.development'
if (process.argv.some(a => a === 'prod')) envFilePath = '.env.production'
if (process.argv.some(a => a === 'stage')) envFilePath = '.env.stage'
if (process.argv.some(a => a === 'local')) isLocal = true

envFilePath.length ? dotenv.config({ path: envFilePath }) : dotenv.config()
const config = {
    DEV: {
        SENTRY_ENV: 'development',
        PORT: 5502,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5502',
        CLIENT_URL: 'http://localhost:3000',
        SG_EMAIL: 'ekip.auto.production@gmail.com',
    },
    STAGE: {
        SENTRY_ENV: 'stage',
        PORT: 5003,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5502',
        CLIENT_URL: 'http://localhost:3000',
        SG_EMAIL: 'ekip.auto.production@gmail.com',
    },
    PROD: {
        SENTRY_ENV: 'production',
        PORT: 5002,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'https://ekip-auto.onrender.com',
        CLIENT_URL: 'https://animated-dragon-b9d633.netlify.app',
        SG_EMAIL: 'ekip.auto.production@gmail.com',
    },
}

const secretesNamesList = ['DB', 'SENDGRID_API_KEY']

const secretes = {}
secretesNamesList.forEach(s => (secretes[s] = process.env[s]))

const env = process.env?.ENV

module.exports = {
    ...config[env],
    ...secretes,
}

module.exports.secretesNamesList = secretesNamesList
