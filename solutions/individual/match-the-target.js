var countPairs = function (values, target) {
  if (values.length === 0) return 0;

  const map = new Map();

  let count = 0;

  for (let i = 0; i < values.length; i++) {
    let valueToFind = target - values[i];

    if (map.has(valueToFind)) {
      count += map.get(valueToFind);
    } else {
      map.set(values[i], (map.get(values[i]) || 0) + 1);
    }
  }

  return count;
};

export default countPairs;
