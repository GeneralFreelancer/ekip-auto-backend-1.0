import { prop, getModelForClass, DocumentType, Severity } from '@typegoose/typegoose'

type Option = Record<string, string>

export class Product {
    @prop({ default: false, required: false, type: Boolean })
    public inTopRate?: boolean

    @prop({ default: false, required: false, type: Boolean })
    public stock?: boolean

    @prop({ default: false, required: false, type: Boolean })
    public hidden?: boolean

    @prop({ type: String, required: true })
    public name!: string

    @prop({ type: String, required: true })
    public description?: string

    @prop({ type: String, required: true })
    public sku?: string

    @prop({ type: String, required: true })
    public category?: string

    @prop({ type: String, required: true })
    public subCategory?: string

    @prop({ type: Number, required: true })
    public quantity?: number

    @prop({ type: Number, required: true })
    public minQuantity?: number

    @prop({ type: Number, required: true })
    public priceUSD?: number

    @prop({ type: Number, required: true })
    public priceUAH?: number

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public options?: Option[]

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public deliveryOptions?: Option[]

    @prop({ type: Array, required: false, allowMixed: Severity.ALLOW })
    public pictures?: string[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    getPublicInfo(this: DocumentType<Product>) {
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
            priceUSD: this.priceUSD,
            priceUAH: this.priceUAH,
            options: this.options,
            deliveryOptions: this.deliveryOptions,
            pictures: this.pictures,
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
