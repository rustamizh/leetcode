export function removeDuplicates(nums: number[]): number {
  let indexOfNonDuplicateElement = 0;
  nums.forEach((num) => {
    if (num !== nums[indexOfNonDuplicateElement]) {
      nums[++indexOfNonDuplicateElement] = num;
    }
  });

  return ++indexOfNonDuplicateElement;
}
