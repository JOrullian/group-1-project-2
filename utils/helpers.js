module.exports = {
    format_date: (date) => {
      return date.toISOString();
    },
    format_amount: (amount) => {
      return parseInt(amount).toLocaleString();
    }}
