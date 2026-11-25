# Problem 1 (Solo) · 100 marks

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
- **Space Complexity:** `O(1)`
- **Approach & Logic:**
  <!-- Briefly explain key data structures, algorithmic design, and trade-offs -->
  my solution is about using a Hashmap in order to count the frequences, and  It makes one pass over the array and uses a hash map to remember what it has already seen. and we compute the partner via the complement in order to keep track on the passed ones and keep adding it

### Edge Cases Tested
if we have an empty array the code will break and it will make us an issue, and for speed i added when the array only containing one element.

### Incomplete Work / Known Limitations (if any)
using a hashmap makes the space O(N)
