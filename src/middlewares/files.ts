/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer'
import path from 'path'
import { generateRandomNumbers } from '../utils/utils'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'images'))
    },
    filename(req, file, cb) {
        cb(null, generateRandomNumbers(6) + '_' + file.originalname)
    },
})

// const types = [
//     'image/png',
//     'image/jpeg',
//     'image/jpg',
//     'application/pdf',
//     'application/vnd.ms-excel',
//     'application/vnd.openxmlformats-',
//     'officedocument.spreadsheetml.sheet',
//     'text/plain',
//     'application/msword',
//     'application/vnd.openxmlformats-',
//     'officedocument.wordprocessingml.document',
// ]

const fileFilter = (req: any, file: any, cb: any) => {
    if (!file || file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx|txt|xls|xlsx|rtf)$/)) {
        cb(null, true)
    } else cb(null, false)
}

export default multer({ storage, fileFilter })
