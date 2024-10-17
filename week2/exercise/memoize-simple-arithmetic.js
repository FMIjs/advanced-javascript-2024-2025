var calculations = new Map();

function performCalculation(operator, ...args) {
  var operationIdentifier = JSON.stringify({
    arguments: [...args].sort(),
    operator: operator,
  });

  if (calculations.has(operationIdentifier)) {
    return calculations.get(operationIdentifier);
  }

  calculations.set(operationIdentifier, null);

  var result;
  switch (operator) {
    case "+":
      result = args.reduce((acc, curr) => acc + curr, 0);
      break;
    case "-":
      result = args.reduce((acc, curr) => acc - curr);
      break;
    case "*":
      result = args.reduce((acc, curr) => acc * curr, 1);
      break;
    case "/":
      result = args.reduce((acc, curr) => {
        if (curr !== 0) {
          return acc / curr;
        } else {
          return "Error: Division by zero";
        }
      });
      break;
    default:
      result = "Error: Invalid operator";
  }

  calculations.set(operationIdentifier, result);

  return result;
}

console.log(performCalculation("+", 5, 10));
console.log(performCalculation("+", 10, 5));

// Another calculation
console.log(performCalculation("/", 8, 2));
console.log(performCalculation("/", 10, 5));
