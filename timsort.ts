function timsort(arr: number[]): number[] {
  const MIN_MERGE = 32;

  function minRunLength(n: number): number {
    let r = 0;
    while (n >= MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }

  function insertionSort(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }
  }

  function merge(arr: number[], l: number, m: number, r: number): void {
    const len1 = m - l + 1;
    const len2 = r - m;
    const left = new Array(len1);
    const right = new Array(len2);
    for (let x = 0; x < len1; x++) {
      left[x] = arr[l + x];
    }
    for (let x = 0; x < len2; x++) {
      right[x] = arr[m + 1 + x];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < len1 && j < len2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < len1) {
      arr[k] = left[i];
      i++;
      k++;
    }

    while (j < len2) {
      arr[k] = right[j];
      j++;
      k++;
    }
  }

  function timsortMain(arr: number[]): void {
    const n = arr.length;
    const minRun = minRunLength(MIN_MERGE);

    for (let i = 0; i < n; i += minRun) {
      insertionSort(arr, i, Math.min(i + minRun - 1, n - 1));
    }

    for (let size = minRun; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, n - 1);
        merge(arr, left, mid, right);
      }
    }
  }

  timsortMain(arr);
  return arr;
}

// Example usage
const arr = [5, 2, 9, 1, 5, 6, 3];
console.log(timsort(arr)); // Output: [1, 2, 3, 5, 5, 6, 9]
