# Problem 2 (Team) · 100 marks

> Place your code and test files in this directory. Fill out the details below to document your submission. The problem statement appears on the live challenge page.

### Language & Version
<!-- e.g., Python 3.11, Node.js 20, Java 17, Go 1.21, C++20 -->
swift 6

### How to Run & Test
<!-- Provide exact, runnable terminal commands including dependency installations if required -->
```sh
# Run solution:

# Run tests:

```

### Approach & Complexity
- **Time Complexity:** `O(N)`
- **Space Complexity:** `O(k)`
- **Approach & Logic:**
  <!-- Briefly explain key data structures, algorithmic design, and trade-offs -->

firstly, to check the distinct values , we want a map or set.
for brute force , we dont need to check again and again which leads to n^2 , 
so , for this we want a sliding window approach .this is a linear .

so , just track the maximum window length for validate windo (at most k distnct .. )
### Edge Cases Tested
- we can try the empty input , also the maximum large input size
- 

### Incomplete Work / Known Limitations (if any)
- none

### Team contributions
- Algorithm and invariant: all
- Edge-case tests: mohammad whos write the code 
- Integration or review: all
- One finding that changed or validated the solution: daoud , sally
