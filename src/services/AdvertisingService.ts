import { DocumentType } from '@typegoose/typegoose'
import * as path from 'path'
import * as fs from 'fs'
import AdvertisingModel, { Advertising, AdvertisingObj } from '../models/AdvertisingModel'
import { Types } from 'mongoose'

export enum ImageType {
    DESKTOP = 'desktop',
    TABLET = 'tablet',
    MOBILE = 'mobile',
}

export class AdvertisingService {
    static async createAdvertising(fields: Partial<Advertising>) {
        return await AdvertisingModel.create(fields)
    }

    static async getAdvertising() {
        const advertisingArr = await AdvertisingModel.find()
        if (!advertisingArr || !advertisingArr.length) return
        return advertisingArr[0]
    }

    static async updateAdvertisingImage(advertising: DocumentType<Advertising>, image: AdvertisingObj, imageType: ImageType) {
        if (imageType === ImageType.DESKTOP) {
            if (advertising.desktop && advertising.desktop.length) advertising.desktop.push(image)
            else advertising.desktop = [image]
        } else if (imageType === ImageType.TABLET) {
            if (advertising.tablet && advertising.tablet.length) advertising.tablet.push(image)
            else advertising.tablet = [image]
        } else if (imageType === ImageType.MOBILE) {
            if (advertising.mobile && advertising.mobile.length) advertising.mobile.push(image)
            else advertising.mobile = [image]
        }
        await advertising.save()
        return advertising.getPublicInfo()
    }

    static async updateAdvertising(id: string | Types.ObjectId, fields: Partial<Advertising>) {
        return await AdvertisingModel.findByIdAndUpdate(id, fields, { new: true })
    }

    static async delImage(imageName: string) {
        const filePath = path.join(__dirname, '..', 'images')
        fs.unlink(path.join(filePath, imageName), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`)
            }
        })
        const advertising = await this.getAdvertising()
        if (!advertising) return
        advertising.desktop = advertising.desktop?.filter(p => p.image !== imageName)
        advertising.tablet = advertising.tablet?.filter(p => p.image !== imageName)
        advertising.mobile = advertising.mobile?.filter(p => p.image !== imageName)
        await advertising.save()
        return advertising
    }
}

export default AdvertisingService
