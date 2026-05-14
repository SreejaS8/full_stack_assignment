const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const difficultyConfig = {
  easy: {
    range: [1, 9],
    operations: ['+', '-'],
  },
  medium: {
    range: [10, 99],
    operations: ['+', '-', '*'],
  },
  hard: {
    range: [6, 144],
    operations: ['+', '-', '*', '/'],
  },
};

export function generateQuestion(difficulty = 'easy') {
  const config = difficultyConfig[difficulty] ?? difficultyConfig.easy;
  const operation = config.operations[randomInt(0, config.operations.length - 1)];
  let left = randomInt(...config.range);
  let right = randomInt(...config.range);
  let answer;

  if (operation === '-') {
    if (right > left) [left, right] = [right, left];
    answer = left - right;
  }

  if (operation === '+') {
    answer = left + right;
  }

  if (operation === '*') {
    const max = difficulty === 'medium' ? 12 : 15;
    left = randomInt(2, max);
    right = randomInt(2, max);
    answer = left * right;
  }

  if (operation === '/') {
    right = randomInt(2, 12);
    answer = randomInt(2, 18);
    left = right * answer;
  }

  return {
    id: crypto.randomUUID(),
    prompt: `${left} ${operation} ${right}`,
    answer,
    operation,
    operands: [left, right],
  };
}
