import { prop, getModelForClass, Ref, DocumentType } from '@typegoose/typegoose'
import ProductService from '../services/ProductServices'
import { User } from './UserModel'

export class ProductInOrder {
    @prop({ type: String, required: true }) public product!: string
    @prop({ type: Number, required: true }) public number!: number
    @prop({ type: Number, required: false }) public weight?: number
}

export class OrderHistory {
    @prop({ ref: User, required: true })
    public user!: Ref<User>

    @prop({ type: ProductInOrder, required: false, _id: false })
    public products?: ProductInOrder[]

    @prop({ required: true, type: String })
    public name!: string

    @prop({ required: true, type: Number })
    public weight!: number

    @prop({ required: true, type: Boolean })
    public payed!: boolean

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    async getPublicInfo(this: DocumentType<OrderHistory>) {
        let products = null
        if (this.products && this.products.length) {
            const promises = this.products.map(async p => {
                const product = await ProductService.findProductById(p.product)
                return { product, number: p.number, weight: p.weight }
            })
            products = await Promise.all(promises)
        }

        return {
            id: this._id,
            products,
            name: this.name,
            weight: this.weight,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(OrderHistory, {
    schemaOptions: {
        timestamps: true,
    },
})
