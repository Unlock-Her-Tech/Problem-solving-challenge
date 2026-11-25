# Problem 1 (Solo) · 100 marks

> Place your code and test files in this directory. Fill out the details below to document your submission. The problem statement appears on the live challenge page.

### Language & Version
<!-- e.g., Python 3.11, Node.js 20, Java 17, Go 1.21, C++20 -->
Python 3.11

### How to Run & Test
<!-- Provide exact, runnable terminal commands including dependency installations if required -->
```sh
# Run solution:

# Run tests:

```
# Run solution:
python solution.py

# Run tests:
python test_solution.py

### Approach & Complexity
- **Time Complexity:** O(n) average
- **Space Complexity:** O(n)

- **Approach & Logic:**
  <!-- Briefly explain key data structures, algorithmic design, and trade-offs -->


I used a dictionary to keep track of the numbers I've seen so far.

For each number, I calculate the value needed to reach the target. If that value is already in the dictionary, I add its frequency to the total number of pairs.

After that, I update the dictionary with the current number.

This allows me to solve the problem in one pass without changing the original array. It also handles duplicate values correctly.

### Edge Cases Tested
Empty array

No matching pairs

Duplicate values

Multiple zeros

Negative numbers

The provided examples

### Incomplete Work / Known Limitations (if any)
- 
None
