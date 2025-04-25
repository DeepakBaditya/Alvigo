#include <stdio.h>
#include <math.h>

int jumpSearch(int arr[], int n, int target) {
    int step = sqrt(n);
    int prev = 0;

    while (arr[(step < n ? step : n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n)
            return -1;
    }

    for (int i = prev; i < (step < n ? step : n); i++) {
        if (arr[i] == target)
            return i;
    }

    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 12, 15, 18};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 12;

    int result = jumpSearch(arr, n, target);
    printf("Found at index: %d\n", result);
    return 0;
}
