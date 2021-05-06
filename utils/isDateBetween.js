const { isValid, differenceInMilliseconds } = require("date-fns");

const isDateBetween = ({ fromDate, toDate }) => (date) =>
  (!isValid(fromDate) || differenceInMilliseconds(date, fromDate) > 0) &&
  (!isValid(toDate) || differenceInMilliseconds(date, toDate) < 0);

module.exports = { isDateBetween };
