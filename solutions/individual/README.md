# Problem 1 (Solo) · 100 marks

> Place your code and test files in this directory. Fill out the details below to document your submission. The problem statement appears on the live challenge page.

### Language & Version
<!-- e.g., Python 3.11, Node.js 20, Java 17, Go 1.21, C++20 -->
swift 6.2.3

### How to Run & Test
<!-- Provide exact, runnable terminal commands including dependency installations if required -->
```sh
# Run solution:

# Run tests:
```

### Approach & Complexity
- **Time Complexity:** `O(N)`
- **Space Complexity:** `O(N)`
- **Approach & Logic:**
  <!-- Briefly explain key data structures, algorithmic design, and trade-offs -->
  firstly , i dont need to write the brute force like try all pairs and loop again and again which leads to N^2
  also i wil get time limit exceeded on large size of input .(as the constrains in the question description).. 2 * 10^5 .. this with n^2 solution will lead time limit ..

  so, i have to lees the time to be linear by add a space .
  we can use a map just to track the numbers as i go ..
  and then , just if the target - current number in the map , this means i found a pair , and then count it.
  for the condition of i < j , this will works sice i move or iterate through the input in one direction ond once time until the end.



### Edge Cases Tested
- we can try the empty inupt
- duplicates numbers like ... [3,3,3]
- nothing found for the target , i mean like this case : [1,2,3] and we want target 10

### Incomplete Work / Known Limitations (if any)
.. so far , nothing
