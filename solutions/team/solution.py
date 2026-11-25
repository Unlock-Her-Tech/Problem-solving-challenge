def longest_segment(arr, k):
    if len(arr) == 0:
        return 0 
    
    counts = {}
    left = 0 
    res = 0
    
    for right in range(len(arr)): 
        num = arr[right]
        
        if num in counts:
            counts[num] = counts[num] + 1 
        else :
            counts[num] = 1 
            
        while len(counts) > k:
            left_num = arr[left]
            counts[left_num] = counts[left_num] - 1 
            
            if counts[left_num] == 0 :
                del counts[left_num]
            
            left = left + 1 
        res  = max(res, right - left + 1)
    return res

longestSegment = longest_segment 

print(longestSegment([1,2,1,2,3], 2))
print(longestSegment([4,4,4], 1))
print(longestSegment([1,2], 0))