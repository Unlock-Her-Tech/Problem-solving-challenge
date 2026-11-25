package solutions.individual;

import java.util.HashMap;
import java.util.Map;

public class MySolution {
    public static void main(String[] args) {
        int[] values = { 1, 5, 7, -1, 5 };
        int target = 6;
        System.out.println(countPairs(values, target));
    }

    public static int countPairs(int[] values, int target) {
        if (values == null || values.length < 2) {
            return 0;
        }
        int counter = 0;
        Map<Integer, Integer> numMap = new HashMap<>();
        for (int num : values) {
            int complement = target - num;
            if (numMap.containsKey(complement)) {
                counter += numMap.get(complement);
            }
            numMap.put(num, numMap.getOrDefault(num, 0) + 1);
        }
        return counter;
    }
}
