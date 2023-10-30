import { prop, getModelForClass, DocumentType, Severity } from '@typegoose/typegoose'
// import config from '../config'
// import ExchangeModel from './ExchangeModel'

type Option = {
    name: string
    value: string
}

export class Product {
    @prop({ default: false, required: false, type: Boolean })
    public inTopRate?: boolean

    @prop({ default: false, required: false, type: Boolean })
    public stock?: boolean

    @prop({ default: false, required: false, type: Boolean })
    public hidden?: boolean

    @prop({ type: String, required: true })
    public name!: string

    @prop({ type: String, required: false })
    public description?: string

    @prop({ type: String, required: false })
    public sku?: string

    @prop({ type: String, required: false })
    public category?: string

    @prop({ type: String, required: false })
    public subCategory?: string

    @prop({ type: Number, required: false })
    public quantity?: number

    @prop({ type: Number, required: false })
    public minQuantity?: number

    @prop({ type: Number, required: false })
    public minQuantity1?: number

    @prop({ type: Number, required: false })
    public priceUSD?: number

    @prop({ type: Number, required: false })
    public priceUAH?: number

    @prop({ type: Number, required: false })
    public priceUSDless?: number

    @prop({ type: Array, required: false, _id: false, allowMixed: Severity.ALLOW })
    public options?: Option[]

    @prop({ type: Array, required: false, _id: false, allowMixed: Severity.ALLOW })
    public deliveryOptions?: Option[]

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public pictures?: string[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    async getPublicInfo(this: DocumentType<Product>) {
        // let priceUAH = null
        // config.APP_DOMAIN + '/images/' +
        const pictures = this.pictures?.map(p => p)
        // const exchange = await ExchangeModel.find()
        // if (exchange.length && this.priceUSD) {
        //     priceUAH = (exchange[0].usdRate as number) * this.priceUSD
        // }
        return {
            id: this._id,
            inTopRate: this.inTopRate,
            stock: this.stock,
            hidden: this.hidden,
            name: this.name,
            description: this.description,
            sku: this.sku,
            category: this.category,
            subCategory: this.subCategory,
            quantity: this.quantity,
            minQuantity: this.minQuantity,
            minQuantity1: this.minQuantity1,
            priceUSD: this.priceUSD,
            priceUAH: this.priceUAH,
            priceUSDless: this.priceUSDless,
            options: this.options,
            deliveryOptions: this.deliveryOptions,
            pictures,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(Product, {
    schemaOptions: {
        timestamps: true,
    },
})
