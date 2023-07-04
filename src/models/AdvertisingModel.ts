import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'
import config from '../config'

export class AdvertisingObj {
    @prop({ type: String, required: false }) public image?: string
    @prop({ type: String, required: false }) public url?: string
}

export class Advertising {
    @prop({ type: AdvertisingObj, required: false, _id: false })
    public desktop?: AdvertisingObj[]

    @prop({ type: AdvertisingObj, required: false, _id: false })
    public tablet?: AdvertisingObj[]

    @prop({ type: AdvertisingObj, required: false, _id: false })
    public mobile?: AdvertisingObj[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    getPublicInfo(this: DocumentType<Advertising>) {
        const desktop = this.desktop?.map(d => ({ Image: config.API_URL + 'images/' + d.image, url: d.url }))
        const tablet = this.tablet?.map(d => ({ Image: config.API_URL + 'images/' + d.image, url: d.url }))
        const mobile = this.mobile?.map(d => ({ Image: config.API_URL + 'images/' + d.image, url: d.url }))
        return {
            desktop,
            tablet,
            mobile,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(Advertising, {
    schemaOptions: {
        timestamps: true,
    },
})
