import dayjs from "dayjs";
import i18next from 'i18next'

require('dayjs/locale/de')
const localizedFormart = require('dayjs/plugin/localizedFormat')
const relativeTime = require('dayjs/plugin/relativeTime')

const locale = i18next.language.split('-')[0]

export const dateLL = (date) => {
    return dayjs(date).locale(locale).format('LL')
}

export const dateFormart = (date) => {
    return dayjs(date).locale(locale).format('YYYY-MM-DD')
}

export const dateRelative = (date) => {
    dayjs.extend(relativeTime)
    console.log(locale)
    return dayjs(date).locale(locale).fromNow()
}


