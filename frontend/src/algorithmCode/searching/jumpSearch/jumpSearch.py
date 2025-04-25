import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    return -1

# Example usage
arr = [1, 3, 5, 7, 9, 12, 15, 18]
target = 12
result = jump_search(arr, target)
print("Found at index:", result)
