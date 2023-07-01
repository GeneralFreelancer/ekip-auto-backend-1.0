import { prop, getModelForClass, Ref, DocumentType } from '@typegoose/typegoose'
import ProductService from '../services/ProductServices'
import { Product } from './ProductModel'
import { User } from './UserModel'

export class ProductInBasket {
    @prop({ ref: Product, required: true }) public product!: string
    @prop({ type: Number, required: true }) public number!: number
}

export class Basket {
    @prop({ ref: User, required: true })
    public user!: Ref<User>

    @prop({ type: ProductInBasket, required: false, _id: false })
    public products?: ProductInBasket[]

    @prop({ type: Date, required: false })
    public createdAt?: Date

    @prop({ type: Date, required: false })
    public updatedAt?: Date

    async getPublicInfo(this: DocumentType<Basket>) {
        let products = null
        if (this.products && this.products.length) {
            const promises = this.products.map(async p => {
                const product = await ProductService.findProductById(p.product)
                return { product, number: p.number }
            })
            products = await Promise.all(promises)
        }

        return {
            id: this._id,
            products,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export default getModelForClass(Basket, {
    schemaOptions: {
        timestamps: true,
    },
})
