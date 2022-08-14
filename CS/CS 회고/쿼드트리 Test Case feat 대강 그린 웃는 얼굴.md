# 쿼드트리 Test Case feat.대강 그린 웃는 얼굴

```jsx
const question = {
  basic: [
    [0, 0],                     // ⬜️⬜️
    [1, 0],                     // 🟦⬜️
  ],
  one: [
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[0, 0, 0, 1]                // ⬜️⬜️⬜️🟦
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
  ],
  two: [
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[0, 0, 0, 0]                // ⬜️⬜️⬜️⬜️
		[0, 0, 1, 0]                // ⬜️⬜️🟦⬜️
  ],
  three: [
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[1, 1, 0, 1]                // 🟦🟦⬜️🟦
		[1, 1, 0, 0]                // 🟦🟦⬜️⬜️
		[1, 1, 1, 0]                // 🟦🟦🟦⬜️
  ],
  smileyFace: [
		[1, 1, 0, 0, 0, 0, 1, 1]                // 🟦🟦⬜️⬜️⬜️⬜️🟦🟦
		[1, 1, 0, 0, 0, 0, 1, 1]                // 🟦🟦⬜️⬜️⬜️⬜️🟦🟦
		[0, 0, 0, 0, 0, 0, 0, 0]                // ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️
		[0, 0, 0, 1, 1, 0, 0, 0]                // ⬜️⬜️⬜️🟦🟦⬜️⬜️⬜️
		[0, 0, 0, 1, 1, 0, 0, 0]                // ⬜️⬜️⬜️🟦🟦⬜️⬜️⬜️
		[0, 0, 0, 0, 0, 0, 0, 0]                // ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️
		[1, 0, 0, 0, 0, 0, 0, 1]                // 🟦⬜️⬜️⬜️⬜️⬜️⬜️🟦
		[1, 1, 1, 1, 1, 1, 1, 1]                // 🟦🟦🟦🟦🟦🟦🟦🟦
  ],
};

const answer = {
  basic: 'pwwbw',
  one: 'ppwwwbpbbwwbw',
  two: 'pwbwpwwbw',
  three: 'ppwwwbbbpwwbw',
  // 제 함수는 ppbwpwwbwwpwbwpwwwbppbwwwwpwbbbpwwbbpwpwbwwpwwbbpbwbb지만 정확도 보장불가
  smileyFace: '?',
};

function markAnswer(answerFunction) {
  const keys = ['basic', 'one', 'two', 'three', 'smileyFace'];

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

// console.log(markAnswer(compressToTree));
```

```jsx
// helpers
function visualize(twoDimensionDots) {
  let result = '';

  twoDimensionDots.forEach((dots) => {
    result += `[${dots.join(', ')}]                // `;

    dots.forEach((dot) => {
      result += dot ? '🟦' : '⬜️';
    });

    result += `\n`;
  });

  return result;
}
```