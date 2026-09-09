// Always rounds UP to the next cent if any fraction exists past 2 decimal places
export const roundUpToCent = (amount: number): number => {
    return Math.ceil(amount * 100) / 100;
};

export const roundToTwoDecimals = (amount: number): number => {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
};