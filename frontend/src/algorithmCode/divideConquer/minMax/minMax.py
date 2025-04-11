def find_min_max(arr, low, high):
    # If the array has only one element
    if low == high:
        return arr[low], arr[high]

    # If the array has only two elements
    if high == low + 1:
        if arr[low] < arr[high]:
            return arr[low], arr[high]
        else:
            return arr[high], arr[low]

    # Divide the array into two halves
    mid = (low + high) // 2
    min1, max1 = find_min_max(arr, low, mid)      # Left half
    min2, max2 = find_min_max(arr, mid + 1, high) # Right half

    # Combine results from both halves
    return min(min1, min2), max(max1, max2)

# Example usage
if __name__ == "__main__":
    arr = [3, 5, 1, 9, 2, 8, 7, 6]
    min_val, max_val = find_min_max(arr, 0, len(arr) - 1)
    print("Minimum element:", min_val)
    print("Maximum element:", max_val)
