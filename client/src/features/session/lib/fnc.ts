const formatUSD = (value: number) => {
  const formattedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  return `$${formattedNumber}`;
};
export { formatUSD }