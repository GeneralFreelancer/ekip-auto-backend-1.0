import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

export class Exchange {
    @prop({ default: false, required: false, type: Number })
    public usdRate?: number

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    getPublicInfo(this: DocumentType<Exchange>) {
        return {
            usdRate: this.usdRate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(Exchange, {
    schemaOptions: {
        timestamps: true,
    },
})
