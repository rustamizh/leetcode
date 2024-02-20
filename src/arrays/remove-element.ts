export function removeElement(nums: (number | string)[], val: number): number {
  let numberOfNonValueOccurences = 0;
  let lastValIndex = nums.length;

  for (let idx = nums.length - 1; idx >= 0; idx--) {
    if (nums[idx] === val) {
      nums[idx] = '_';
      const occurence = nums[idx];
      nums[idx] = nums[lastValIndex - 1];
      nums[lastValIndex - 1] = occurence;
      lastValIndex--;
    } else {
      numberOfNonValueOccurences++;
    }
  }

  return numberOfNonValueOccurences;
}

export function removeElementSimple(nums: number[], val: number): number {
  let lastNonValueElementIndex = 0;
  nums.forEach((num) => {
    if (num !== val) {
      nums[lastNonValueElementIndex] = num;
      lastNonValueElementIndex++;
    }
  });

  return lastNonValueElementIndex;
}
