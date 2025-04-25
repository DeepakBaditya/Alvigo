public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target)
                return i; // Found
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] arr = {3, 5, 7, 9, 11};
        int target = 9;
        int result = linearSearch(arr, target);

        if (result != -1)
            System.out.println("Element found at index " + result);
        else
            System.out.println("Element not found");
    }
}
