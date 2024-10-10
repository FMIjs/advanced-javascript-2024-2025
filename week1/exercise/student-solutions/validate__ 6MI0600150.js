const example = "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9";

console.log(
  example
    .split("=")
    .map(evall)
    .reduce(
      (acc, current, currentIndex, arr) => [
        acc[0] +
          (currentIndex !== arr.length - 1 && current === arr[arr.length - 1]),
        arr.length - 1,
      ],
      [0, 0]
    )
    .reduce((acc, current) => acc + "/" + current)
);

// # pravilno e
function evall(str) {
  str = str.replace(/\s/g, "");
  const plus = str.split("+");

  if (plus.length > 1) {
    return plus.reduce((acc, current) => acc + evall(current), 0);
  }

  const minus = str.split("-");

  if (minus.length > 1) {
    return minus.reduce(
      (acc, current, index) =>
        acc + (index === 0 ? evall(current) : -evall(current)),
      0
    );
  }

  const multiply = str.split("*");

  if (multiply.length > 1) {
    return multiply.reduce((acc, current) => acc * evall(current), 1);
  }

  return parseInt(str);
}
