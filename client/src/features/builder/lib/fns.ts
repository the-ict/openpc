
const formatPrice = (usdAmount: number) => {
    return `$${usdAmount.toLocaleString()}`;
};

export { formatPrice };