import ExchangeModel from '../models/ExchangeModel'

export class ExchangeService {
    static async setExchange(usdRate: number) {
        const exchange = await ExchangeModel.find()
        if (exchange.length) {
            exchange[0].usdRate = usdRate
            await exchange[0].save()
        } else await ExchangeModel.create({ usdRate })
        return usdRate
    }

    static async getExchange() {
        const exchange = await ExchangeModel.find()
        if (exchange.length) return exchange[0].usdRate
        else return null
    }
}

export default ExchangeService
