const { isValid, differenceInMilliseconds } = require("date-fns");

const isDateBetween = ({ from, to }) => (date) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return (
    (!isValid(fromDate) || differenceInMilliseconds(date, fromDate) > 0) &&
    (!isValid(toDate) || differenceInMilliseconds(date, toDate) < 0)
  );
};

module.exports = { isDateBetween };
