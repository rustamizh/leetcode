function removeDuplicates(nums: number[]): number {
  let indexToInsertElement = 2;

  nums.forEach((num, idx) => {
    if (idx > 1 && num !== nums[indexToInsertElement - 2]) {
      nums[indexToInsertElement] = num;
      indexToInsertElement++;
    }
  });

  return indexToInsertElement;
}
