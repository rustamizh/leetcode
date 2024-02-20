export function removeElement(nums: (number | string)[], val: number): number {
  let numberOfValueOccurences = 0;
  let lastValIndex = nums.length;

  for (let idx = nums.length - 1; idx >= 0; idx--) {
    if (nums[idx] === val) {
      numberOfValueOccurences++;
      nums[idx] = '_';
      const occurence = nums[idx];
      const elementToSwap = nums[lastValIndex - 1];
      nums[idx] = elementToSwap;
      nums[lastValIndex - 1] = occurence;
      lastValIndex--;
    }
  }

  return numberOfValueOccurences;
}
