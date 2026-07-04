const formatUZS = (value: number) => {
  const formattedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  return `UZS ${formattedNumber}`;
};
export { formatUZS }