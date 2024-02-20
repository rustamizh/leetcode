/**
 Do not return anything, modify nums1 in-place instead.
 */
export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  let insertionIndex = m + n - 1;
  let numsOneBiggestElementIndex = m - 1;
  let numsTwoBiggestElementIndex = n - 1;

  while (nums2.length !== 0) {
    if (
      nums2[numsTwoBiggestElementIndex] >= nums1[numsOneBiggestElementIndex] ||
      numsOneBiggestElementIndex === -1
    ) {
      nums1[insertionIndex] = nums2.pop() as number;
      numsTwoBiggestElementIndex--;
    } else {
      const numsOneBiggestElement = nums1[numsOneBiggestElementIndex];
      nums1[numsOneBiggestElementIndex] = nums1[insertionIndex];
      nums1[insertionIndex] = numsOneBiggestElement;
      numsOneBiggestElementIndex--;
    }

    insertionIndex--;
  }
}
