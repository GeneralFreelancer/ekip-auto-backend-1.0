import { Types } from 'mongoose'
import ProductModel, { Product } from '../models/ProductModel'
import { DocumentType } from '@typegoose/typegoose'
import * as path from 'path'
import * as fs from 'fs'

export class ProductService {
    static async createProduct(fields: Partial<Product>) {
        const user = await ProductModel.create(fields)
        return user
    }

    static async createOrUpdateProducts(products: Partial<Product>[]) {
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const productDB = await this.findProductBySku(product.sku as string)
            if (!productDB) await this.createProduct(product)
            else await this.updateProduct(productDB._id, product)
        }
    }

    static async findProductBySku(sku: string) {
        return await ProductModel.findOne({ sku })
    }

    static async findProductById(id: Types.ObjectId | string) {
        return await ProductModel.findById(id)
    }

    static async updateProduct(id: Types.ObjectId | string, fields: Partial<Product>) {
        return await ProductModel.findByIdAndUpdate(id, { ...fields }, { new: true })
    }

    static async updateProductImage(product: DocumentType<Product>, imageName: string, main?: boolean) {
        if (!product.pictures) product.pictures = []
        if (main) product.pictures.unshift(imageName)
        else product.pictures.push(imageName)
        await product.save()
        return await product.getPublicInfo()
    }

    static async delImage(product: DocumentType<Product>, imageName: string) {
        const filePath = path.join(__dirname, '..', 'images')
        fs.unlink(path.join(filePath, imageName), err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(`Error: ${err}`)
            }
        })
        product.pictures = product.pictures?.filter(p => p !== imageName)
        await product.save()
        return await product.getPublicInfo()
    }

    static async getProducts() {
        const productsDB = await ProductModel.find()
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }

    static async delProduct(id: string) {
        const product = await ProductModel.findByIdAndDelete(id)
        if (!product) return null
        if (product.pictures?.length)
            product.pictures.forEach(async p => {
                await this.delImage(product, p)
            })

        return product
    }
}

export default ProductService
