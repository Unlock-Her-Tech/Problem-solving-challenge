def countPairs(nums, target):
    seen = {}
    count = 0
    for num in range(len(nums)):
        needed = target - nums[num]     
        if needed in seen:
            count += seen[needed]
        if nums[num] in seen:
            seen[nums[num]] += 1
        else:
            seen[nums[num]] = 1
    return count

