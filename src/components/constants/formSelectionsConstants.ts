export const platforms = ["TIGER", "FUTU", "WEBULL"] as const
export type Platform = typeof platforms[number];
export const calSelections = ["STOCK", "OPTION"] as const
export type CalSelection = typeof calSelections[number];
export const markets = ['HK', 'US'] as const
export type Market = typeof markets[number]