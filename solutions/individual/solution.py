
def countPairs(values, target):
    seen = {}
    pairs = 0

    for num in values:
        needed = target - num

        if needed in seen:
            pairs += seen[needed]

        seen[num] = seen.get(num, 0) + 1

    return pairs


if __name__ == "__main__":
    print(countPairs([1, 5, 7, -1, 5], 6))  # 3
    print(countPairs([3, 3, 3], 6))         # 3
    print(countPairs([], 6))                # 0
    print(countPairs([5, 5], 10))           # 1
