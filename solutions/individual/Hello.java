import java.util.HashMap;

public class Hello {
    public static void main(String[] args) {
        System.out.println(countPairs(new int[] { 1, 5, 7, -1, 5 }, 6));

    }

    // the idea is that instead of keep searching I will use the "target - value
    // [i]" to see if the other values in the array is what I need then I will count
    // and see if the condifiton is what I need then I will return the counter

    // time is O(N) space is O(n)
    public static int countPairs(int[] values, int target) {
        if (values == null || values.length == 0)
            return 0;

        HashMap<Integer, Integer> map = new HashMap();

        int counter = 0;
        for (int i = 0; i < values.length; i++) {
            int neededValue = target - values[i];
            counter += map.getOrDefault(neededValue, 0);
            map.put(values[i], map.getOrDefault(values[i], 0) + 1);
        }

        return counter;
    }
}