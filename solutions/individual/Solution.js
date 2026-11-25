
function countPairs(values, target) {
  let count = 0;

  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] + values[j] === target) {
        count++;
      }
    }
  }

  return count;
}
console.log(countPairs([1, 5, 7, -1, 5], 6)); // 3
console.log(countPairs([3, 3, 3], 6)); // 3
console.log(countPairs([], 10)); // 0