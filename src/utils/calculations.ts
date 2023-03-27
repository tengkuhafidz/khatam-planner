import { NUM_OF_PRAYERS, TOTAL_PAGES } from "../constants";

export interface PagesAllocation {
    subuh: number,
    zuhur: number,
    asar: number,
    maghrib: number,
    isyak: number,
    remainder: number
}

export const calculatePagesPerPrayer = (days: number, startingPage = 1): PagesAllocation => {
    const pagesToRead = TOTAL_PAGES - startingPage + 1
    const pagesPerDay = pagesToRead / days
    const precisePagesPerPrayer = Number((pagesPerDay / NUM_OF_PRAYERS).toFixed(2))
    const constantPagesPerPrayer = Math.floor(precisePagesPerPrayer)
    const remainder = Math.ceil((precisePagesPerPrayer - constantPagesPerPrayer) * NUM_OF_PRAYERS)

    return {
        subuh: constantPagesPerPrayer,
        zuhur: constantPagesPerPrayer,
        asar: constantPagesPerPrayer,
        maghrib: constantPagesPerPrayer,
        isyak: constantPagesPerPrayer,
        remainder: remainder
    }
}