# Problem 2 (Team) · 100 marks

> Place your code and test files in this directory. Fill out the details below to document your submission. The problem statement appears on the live challenge page.

### Language & Version
Java

### How to Run & Test
<!-- Provide exact, runnable terminal commands including dependency installations if required -->
```sh
# Run solution:

# Run tests:

```

### Approach & Complexity
- **Time Complexity:** `O(N)`
- **Space Complexity:** `O(K)`
- **Approach & Logic:**
  <!-- Briefly explain key data structures, algorithmic design, and trade-offs -->
We used Sliding window approach where if we have exceeded the K we needed to move our window one shift to the left, and keep track on the current number of K and keep shifting it until we have the exact number of K in our hashmap in order to keep tracking also on the longest consecutive subsequence
### Edge Cases Tested
We checked about  empty arrays, k = 0,
### Incomplete Work / Known Limitations (if any)
- 

### Team contributions
- Algorithm and invariant:
- Edge-case tests:
- Integration or review:
- One finding that changed or validated the solution:
