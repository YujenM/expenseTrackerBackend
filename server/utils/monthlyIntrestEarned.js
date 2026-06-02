module.exports = (principal, starDate, endDate, interestRate) => {
  const start = new Date(starDate);
  const end = new Date(endDate);

  const n =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const interestEarned = parseFloat(
    (
      principal *
      ((n * (n + 1)) / (2 * 12 * 12)) *
      (interestRate / 100)
    ).toFixed(2),
  );
  return interestEarned;
};
