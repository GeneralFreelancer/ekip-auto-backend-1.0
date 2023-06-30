/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'images'))
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    },
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req: any, file: any, cb: any) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else cb(null, false)
}

export default multer({ storage, fileFilter })
