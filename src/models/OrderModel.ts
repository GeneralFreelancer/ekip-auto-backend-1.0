import { prop, getModelForClass, Ref, DocumentType } from '@typegoose/typegoose'
import { Product } from './ProductModel'
import { User } from './UserModel'

export class ProductInOrder {
    @prop({ ref: Product, required: true }) public products!: Ref<Product>
    @prop({ type: Number, required: true }) public number!: number
    @prop({ type: Number, required: false }) public weight?: number
}

export class Order {
    @prop({ ref: User, required: true })
    public user!: Ref<User>

    @prop({ type: ProductInOrder, required: false, _id: false })
    public products?: ProductInOrder[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    async getPublicInfo(this: DocumentType<Order>) {
        return {
            id: this._id,
            products: this.products,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(Order, {
    schemaOptions: {
        timestamps: true,
    },
})
