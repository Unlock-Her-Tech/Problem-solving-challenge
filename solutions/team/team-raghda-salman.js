var longestSegment = function (values, k) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;

  if (k <= 0) return 0;

  for (let i = 0; i < values.length; i++) {

    map.set(values[i], (map.get(values[i]) || 0) + 1);

    while (map.size > k) {
      map.set(values[left], map.get(values[left]) - 1);

      if (map.get(values[left]) === 0) {
        map.delete(values[left]);
      }

      left++;
    }

    maxLength = Math.max(maxLength, i - left + 1);
  }

  return maxLength;
};

export default longestSegment; No newline at end of file