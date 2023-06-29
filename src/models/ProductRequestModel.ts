import { prop, getModelForClass, Ref, DocumentType } from '@typegoose/typegoose'
import { Product } from './ProductModel'
import { User } from './UserModel'

export class ProductRequest {
    @prop({ ref: User, required: true })
    public user!: Ref<User>

    @prop({ ref: Product, required: true })
    public product!: Ref<Product>

    @prop({ type: Boolean, required: true, default: false })
    public status?: boolean

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    async getPublicInfo(this: DocumentType<ProductRequest>) {
        return {
            id: this._id,
            product: this.product,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(ProductRequest, {
    schemaOptions: {
        timestamps: true,
    },
})
