/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const AWS = require('aws-sdk')
const write = require('write')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.key' })

const { secretesNamesList } = require('./config.js')

const ssm = new AWS.SSM({
    region: 'us-east-2',
    accessKeyId: process.env.AMAZON_KEY_ID,
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
})

const getSecretes = async secretesNamesList => {
    const secretesPaths = []
    secretesNamesList.forEach(s => {
        secretesPaths.push(`/dev/${s}`)
        secretesPaths.push(`/prod/${s}`)
        secretesPaths.push(`/stage/${s}`)
    })

    const params = {
        Names: secretesPaths,
        WithDecryption: false,
    }

    const secret = await ssm.getParameters(params).promise()
    if (!secret.Parameters) throw new Error('Failed to load parameters')

    const secretesList = []
    for (let i = 0; i < secret.Parameters?.length; i++) {
        const parm = secret.Parameters[i]
        secretesList.push({
            id: parm.Name.replace(/\/dev\/|\/prod\/|\/stage\//, ''),
            path: parm.Name,
            value: parm.Value,
        })
    }

    return secretesList
}

const generateEnvFile = async secretes => {
    let devEnvFile = 'ENV=DEV\n'
    let prodEnvFile = 'ENV=PROD\n'
    let stageEnvFile = 'ENV=STAGE\n'

    secretes.forEach(s => {
        if (s.path.startsWith('/dev/')) devEnvFile += `${s.id}=${s.value}\n`
        if (s.path.startsWith('/prod/')) prodEnvFile += `${s.id}=${s.value}\n`
        if (s.path.startsWith('/stage/')) stageEnvFile += `${s.id}=${s.value}\n`
    })

    write.sync('.env.production', prodEnvFile)
    write.sync('.env.development', devEnvFile)
    write.sync('.env.stage', stageEnvFile)
}

;(async () => {
    const chunkSize = 3
    const groupedSecretes = [...Array(Math.ceil(secretesNamesList.length / chunkSize))].map(_ => secretesNamesList.splice(0, chunkSize))
    let secretes = []

    for (let i = 0; i < groupedSecretes.length; i++) {
        const secretesInGroup = await getSecretes(groupedSecretes[i])
        secretes = [...secretes, ...secretesInGroup]
    }

    generateEnvFile(secretes)
    console.log('Secretes Generated')
})()
