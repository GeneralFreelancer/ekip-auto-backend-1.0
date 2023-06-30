import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

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

    async getPublicInfo(this: DocumentType<Advertising>) {
        return {
            desktop: this.desktop,
            tablet: this.desktop,
            mobile: this.desktop,
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
