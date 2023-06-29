import { addDays } from 'date-fns'
import { DayOfTheWeek, ContributionPeriod, Frequency } from '../models/RecurringContributionModel'

export const getWeeklyEventCronFormat = (day?: DayOfTheWeek) => {
    if (day === DayOfTheWeek.SUNDAY) return '00 09 * * 0'
    if (day === DayOfTheWeek.MONDAY) return '00 09 * * 1'
    if (day === DayOfTheWeek.TUESDAY) return '00 09 * * 2'
    if (day === DayOfTheWeek.WEDNESDAY) return '00 09 * * 3'
    if (day === DayOfTheWeek.THURSDAY) return '00 09 * * 4'
    if (day === DayOfTheWeek.FRIDAY) return '00 09 * * 5'
    if (day === DayOfTheWeek.SATURDAY) return '00 09 * * 6'
    else return null
}

export const getCronFormatInterval = (frequency: Frequency) => {
    let cronInterval = null
    const isDev = process.argv.some(a => a === 'dev')

    if (frequency.contributionPeriod === ContributionPeriod.DAILY) cronInterval = '00 09 * * *' // Daily at 09:00

    if (frequency.contributionPeriod === ContributionPeriod.WEEKLY) cronInterval = isDev ? '3 minutes' : getWeeklyEventCronFormat(frequency.dayOfTheWeek)

    if (frequency.contributionPeriod === ContributionPeriod.MONTHLY) cronInterval = isDev ? '5 minutes' : `00 09 ${frequency.date} * *` // Monthly on DATE

    return cronInterval
}

export const getDateNowUSFormat = (daysToAdd?: number) => {
    let dateNow = new Date()

    const offset = dateNow.getTimezoneOffset()
    dateNow = new Date(dateNow.getTime() - offset * 60 * 1000)
    if (daysToAdd) {
        dateNow = addDays(dateNow, daysToAdd)
    }
    return dateNow.toISOString().split('T')[0]
}
