package solutions.team;

import java.util.HashMap;
import java.util.Map;

public class OurSolution {
    public static void main(String args[]) {
        int[] values = { 1, 2, 1, 2, 3 };
        int k = 2;
        System.err.println(longestSegment(values, k));
    }

    public static int longestSegment(int[] values, int k) {
        if (k == 0) {
            return 0;
        }
        if(values == null){
            return 0;
        }
        int left = 0;
        int length = 0;
        Map<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < values.length; i++) {
            frequency.put(values[i], frequency.getOrDefault(values[i], 0) + 1);
            while (frequency.size() > k) {
                frequency.put(values[left], frequency.get(values[left]) - 1);
                if (frequency.get(values[left]) == 0) {
                    frequency.remove(values[left]);
                }
                left++;
            }
            length = Math.max(length, (i - left) + 1);
        }
        return length;
    }

}
