const question = {
  basic: [
    [0, 0],
    [1, 0],
  ],
  one: [
    [1, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 0],
  ],
  two: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
  ],
  three: [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [1, 1, 1, 0],
  ],
  // smileyFace: [
  //   [1, 1, 0, 0, 0, 0, 1, 1],
  //   [1, 1, 0, 0, 0, 0, 1, 1],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1],
  // ],
};

const answer = {
  basic: 'pwwbw',
  one: 'ppwwwbpbbwwbw',
  two: 'pwbwpwwbw',
  three: 'ppwwwbbbpwwbw',
  // smileyFace: '?',
};

function markAnswer(answerFunction) {
  const keys = Object.keys(question);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const targetQuestion = question[key];
    const targetAnswer = answer[key];

    if (answerFunction(targetQuestion) !== targetAnswer) {
      console.log(answerFunction(targetQuestion), targetAnswer);
      throw new Error(`Invalid Answer for question ${key}`);
    }
  }

  return 'Awesome';
}

function compressToTree(twoDimensionDots, [y, x] = [0, 0], size = twoDimensionDots.length) {
  const half = size / 2;
  const total = getTotal(twoDimensionDots, [y, x], size);
  const maxSum = size * size;

  switch (total) {
    case 0:
      return 'w';
    case maxSum:
      return 'b';
    default:
      const rightTop = compressToTree(twoDimensionDots, [y, x + half], half);
      const leftTop = compressToTree(twoDimensionDots, [y, x], half);
      const leftBottom = compressToTree(twoDimensionDots, [y + half, x], half);
      const rightBottom = compressToTree(twoDimensionDots, [y + half, x + half], half);

      return 'p' + rightTop + leftTop + leftBottom + rightBottom;
  }
}

function getTotal(twoDimensionDots, [startY, startX], size) {
  return twoDimensionDots.slice(startY, startY + size).reduce((y_acc, y_val) => {
    return y_acc + y_val.slice(startX, startX + size).reduce((x_acc, x_val) => x_acc + x_val, 0);
  }, 0);
}

// console.log(markAnswer(compressToTree));
