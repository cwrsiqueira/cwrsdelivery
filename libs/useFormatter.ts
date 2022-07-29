export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },
    formatNumber: (number: number, digits: number) => {
        let numberLength = number.toString().length
        if (numberLength >= digits) return number
        const remain = digits - numberLength
        return `${'0'.repeat(remain)}${number}`
    }
})