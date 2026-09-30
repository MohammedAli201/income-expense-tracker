export const formatMoney = (value) => new Intl.NumberFormat('en-GB', {
  style: 'currency', currency: 'NOK', minimumFractionDigits: 2, maximumFractionDigits: 2,
}).format(value);
