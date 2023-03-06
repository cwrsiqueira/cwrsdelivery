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
    },
    formatDate: (date: string) => {
        let currentDate = new Date(`${date} 00:00:00`);
        return new Intl.DateTimeFormat('pt-BR').format(currentDate);
    }
})