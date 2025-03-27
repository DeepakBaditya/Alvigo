#include <stdio.h>

struct Pair {
    int min;
    int max;
};

struct Pair findMinMax(int arr[], int low, int high) {
    struct Pair result, left, right;

    if (low == high) { // One element
        result.min = arr[low];
        result.max = arr[low];
        return result;
    }

    if (high == low + 1) { // Two elements
        if (arr[low] > arr[high]) {
            result.min = arr[high];
            result.max = arr[low];
        } else {
            result.min = arr[low];
            result.max = arr[high];
        }
        return result;
    }

    int mid = (low + high) / 2;
    left = findMinMax(arr, low, mid);
    right = findMinMax(arr, mid + 1, high);

    result.min = (left.min < right.min) ? left.min : right.min;
    result.max = (left.max > right.max) ? left.max : right.max;

    return result;
}

int main() {
    int arr[] = {3, 5, 1, 9, 2, 8, 7, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    struct Pair result = findMinMax(arr, 0, n - 1);
    printf("Minimum: %d\n", result.min);
    printf("Maximum: %d\n", result.max);

    return 0;
}
