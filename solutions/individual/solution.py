from collections import defaultdict

def count_pairs(values, target):
    seen = defaultdict(int)
    total = 0
    for x in values:
        total += seen.get(target - x, 0)
        seen[x] += 1
    return total

countPairs = count_pairs

print(countPairs([1, 2, 3, 4, 3], 6))  # Output: 2