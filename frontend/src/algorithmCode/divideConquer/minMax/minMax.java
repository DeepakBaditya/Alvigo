class MinMax {
    static class Pair {
        int min, max;

        Pair(int min, int max) {
            this.min = min;
            this.max = max;
        }
    }

    static Pair findMinMax(int[] arr, int low, int high) {
        if (low == high) { // Only one element
            return new Pair(arr[low], arr[low]);
        }

        if (high == low + 1) { // Two elements
            if (arr[low] > arr[high]) {
                return new Pair(arr[high], arr[low]);
            } else {
                return new Pair(arr[low], arr[high]);
            }
        }

        int mid = (low + high) / 2;
        Pair left = findMinMax(arr, low, mid);
        Pair right = findMinMax(arr, mid + 1, high);

        return new Pair(Math.min(left.min, right.min), Math.max(left.max, right.max));
    }

    public static void main(String[] args) {
        int[] arr = {3, 5, 1, 9, 2, 8, 7, 6};
        Pair result = findMinMax(arr, 0, arr.length - 1);
        System.out.println("Minimum: " + result.min);
        System.out.println("Maximum: " + result.max);
    }
}
