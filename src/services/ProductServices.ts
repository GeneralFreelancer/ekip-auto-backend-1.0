import { Types } from 'mongoose'
import ProductModel, { Product } from '../models/ProductModel'
import { DocumentType } from '@typegoose/typegoose'
import * as path from 'path'
import * as fs from 'fs'
import { ObjectId } from 'mongodb'
import UserService from './UserServices'
import OrderService from './OrderService'

export enum ProductFilter {
    DATE = 'date',
    TOP = 'top',
    LAST_SEEN = 'last_seen',
    INTEREST = 'interest',
}

export interface IGetFilteredProducts {
    search?: string
    filter?: ProductFilter
    category?: string
    subcategory?: string
    limit?: number
    userId?: string
}

export class ProductService {
    static async createProduct(fields: Partial<Product>) {
        const user = await ProductModel.create(fields)
        return user
    }

    static async createProducts(products: Partial<Product>[]) {
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const productDB = await this.findProductBySku(product.sku as string)
            if (!productDB) await this.createProduct(product)
        }
    }

    static async updateProducts(products: Partial<Product>[]) {
        for (let i = 0; i < products.length; i++) {
            const { priceUAH, priceUSD, quantity, sku } = products[i]
            const productDB = await this.findProductBySku(sku as string)
            if (productDB) await this.updateProduct(productDB._id, { priceUAH, priceUSD, quantity })
        }
        // const productsDB = await ProductModel.find()
        // for (let i = 0; i < productsDB.length; i++) {
        //     const productDB = productsDB[i]
        //     if (!products.some(p => p.sku === productDB.sku)) await this.delProduct(productDB._id)
        // }
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

    static async delProduct(id: string | Types.ObjectId) {
        const product = await ProductModel.findByIdAndDelete(id)
        if (!product) return null
        if (product.pictures?.length)
            product.pictures.forEach(async p => {
                await this.delImage(product, p)
            })

        return product
    }

    static async checkProductsAndGetCategories() {
        const categories: { category: string; subcategories: string[] }[] = []
        const products = await ProductModel.find()
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            if (!product.priceUAH && !product.priceUSD) {
                product.hidden = true
                await product.save()
            }
            if (product.category && !categories.some(c => c.category === product.category)) categories.push({ category: product.category, subcategories: [] })
            if (product.subCategory && product.category) {
                const index = categories.findIndex(c => c.category === product.category)
                if (index !== -1 && !categories[index].subcategories.some(sc => sc === product.subCategory)) categories[index].subcategories.push(product.subCategory)
            }
        }

        return categories
    }

    static async getFilteredProducts({ search, filter, category, subcategory, limit, userId }: IGetFilteredProducts) {
        const validUserId = userId && ObjectId.isValid(userId) ? userId : undefined

        if (validUserId && filter === ProductFilter.LAST_SEEN) return await this.findUserLastSeenProducts(validUserId)

        if (filter === ProductFilter.LAST_SEEN) return await this.findAllLastSeenProducts()

        if (filter === ProductFilter.INTEREST) return await this.findInterestProducts()

        if (filter === ProductFilter.TOP) return await this.findTopProducts()

        let model = {}

        if (search) {
            const regex = new RegExp(search, 'i')
            model = { name: regex }
        } else if (subcategory) {
            model = { subcategory }
        } else if (category) model = { category }

        const productsDB = limit ? await ProductModel.find(model).limit(limit) : await ProductModel.find(model)
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }

    static async findUserLastSeenProducts(userId: string) {
        const user = await UserService.findUserById(userId)
        if (user && user.lastSeenProducts?.length) {
            const productsDB = await ProductModel.find({ _id: { $in: user.lastSeenProducts } })
            const promise = productsDB.map(async p => await p.getPublicInfo())
            const products = await Promise.all(promise)
            return products
        } else return []
    }

    static async findAllLastSeenProducts() {
        const sortedProducts: { productId: string; number: number }[] = []
        const users = await UserService.findAllUsers()
        users.forEach(user => {
            if (user.lastSeenProducts?.length) {
                user.lastSeenProducts.forEach(productId => {
                    if (sortedProducts.some(p => p.productId === productId)) {
                        const index = sortedProducts.findIndex(p => p.productId === productId)
                        sortedProducts[index].number = sortedProducts[index].number + 1
                    } else sortedProducts.push({ productId, number: 1 })
                })
            }
        })
        sortedProducts.sort((a, b) => b.number - a.number)
        const sortedIds = sortedProducts.map(p => p.productId)
        const lastSeenProductsDB = await ProductModel.find({ _id: { $in: sortedIds } })
        const allProductsDB = await ProductModel.find()
        const notSeenProductsDB = allProductsDB.filter(allP => {
            if (lastSeenProductsDB.some(seenP => String(seenP._id) === String(allP._id))) return false
            else return true
        })
        const productsDB = [...lastSeenProductsDB, ...notSeenProductsDB]
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }

    static async findInterestProducts() {
        const productsDB = await ProductModel.find()
        const filteredProductsDB = productsDB.filter(p => p.quantity && typeof p.quantity === 'number')
        filteredProductsDB.sort((a, b) => (b.quantity as number) - (a.quantity as number))
        const promise = filteredProductsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }

    static async findTopProducts() {
        const orderHistory = await OrderService.getAllOrders()
        const sortedProducts: { productId: string; number: number }[] = []
        orderHistory.forEach(order => {
            if (order.products?.length) {
                order.products.forEach(product => {
                    if (sortedProducts.some(p => p.productId === product.product)) {
                        const index = sortedProducts.findIndex(p => p.productId === product.product)
                        sortedProducts[index].number = sortedProducts[index].number + 1
                    } else sortedProducts.push({ productId: product.product, number: 1 })
                })
            }
        })
        sortedProducts.sort((a, b) => b.number - a.number)
        const sortedIds = sortedProducts.map(p => p.productId)
        const lastSeenProductsDB = await ProductModel.find({ _id: { $in: sortedIds } })
        const allProductsDB = await ProductModel.find()
        const notSeenProductsDB = allProductsDB.filter(allP => {
            if (lastSeenProductsDB.some(seenP => String(seenP._id) === String(allP._id))) return false
            else return true
        })
        const productsDB = [...lastSeenProductsDB, ...notSeenProductsDB]
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }

    static async getFavoriteProducts(productsId: string[]) {
        const productsDB = await ProductModel.find({ _id: { $in: productsId } })
        const promise = productsDB.map(async p => await p.getPublicInfo())
        const products = await Promise.all(promise)
        return products
    }
}

export default ProductService
