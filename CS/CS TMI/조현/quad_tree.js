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
      throw new Error(`Invalid Answer for question ${key}`);
    }
  }

  return 'Awesome';
}

function compressToTree(twoDimensionDots, [y, x] = [0, 0], size = twoDimensionDots.length) {
  const half = size / 2;
  let result = '';

  if (size === 1 || checkAllSame(twoDimensionDots, [y, x], size)) {
    return twoDimensionDots[y][x] ? 'b' : 'w';
  }

  result += compressToTree(twoDimensionDots, [y, x + half], half);
  result += compressToTree(twoDimensionDots, [y, x], half);
  result += compressToTree(twoDimensionDots, [y + half, x], half);
  result += compressToTree(twoDimensionDots, [y + half, x + half], half);

  return 'p'+ result;
}

function checkAllSame(twoDimensionDots, [startY, startX], size) {
  const endY = startY + size;
  const endX = startX + size;
  const initialValue = twoDimensionDots[startY][startX];


  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      if (twoDimensionDots[y][x] !== initialValue) {
        return false;
      }
    }
  }

  return true;
}

// console.log(markAnswer(compressToTree));
