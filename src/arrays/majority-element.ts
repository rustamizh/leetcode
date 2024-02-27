export function majorityElement(nums: number[]): number {
  let element: number = 0;
  let count: number = 0;

  for (let num of nums) {
    if (count === 0) {
      element = num;
    }

    count += element === num ? 1 : -1;
  }

  return element;
}

export function majorityElementSort(nums: number[]): number {
  nums.sort((a, b) => a - b);

  const middleIndex = Math.ceil(nums.length / 2);
  const element = nums[middleIndex];

  return element;
}
