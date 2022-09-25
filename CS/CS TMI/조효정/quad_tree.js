const input = [
  [1, 1, 0, 0],
  [0, 0, 0, 1],
  [1, 1, 0, 0],
  [1, 1, 0, 0],
]
const len = input.length;

const quadTree = n => {
  let quadTree = "";

  const recursion = (n, x, y) => {
    let total = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        total += input[y + j][x + i];
      }
    }

    if (total === 0) quadTree += "w";
    else if (total === n * n) quadTree += "b";
    else {
      n /= 2;
      quadTree += "p";
      recursion(n, x + n, y);
      recursion(n, x, y);
      recursion(n, x, y + n);
      recursion(n, x + n, y + n);
    }
  }

  recursion(n, 0, 0);

  return quadTree;
};

const result = quadTree(len);

console.log(result)
