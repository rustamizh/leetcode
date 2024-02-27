/**
 Do not return anything, modify nums in-place instead.
 */
function rotateByOne(nums: number[], k: number): void {
  let shiftNum = k % nums.length;

  while (shiftNum > 0) {
    rotateRight(nums);
    shiftNum--;
  }

  function rotateRight(nums: number[]) {
    const lastElement = nums[nums.length - 1];

    for (let idx = nums.length - 2; idx >= 0; idx--) {
      nums[idx + 1] = nums[idx];
    }

    nums[0] = lastElement;
  }
}

function rotateReverse(nums: number[], k: number): void {
  const shiftNum = k % nums.length;

  const cliceIndex = nums.length - shiftNum;
  const spliced = nums.splice(cliceIndex);
  nums.reverse();

  while (spliced.length > 0) {
    nums.push(spliced.pop() as number);
  }

  nums.reverse();
}

function rotateExtraArray(nums: number[], k: number): void {
  const shiftNum = k % nums.length;
  let indexOfRotated = nums.length - shiftNum;
  let lastIndexOfRest = indexOfRotated - 1;
  const bufferArray: number[] = [];

  while (indexOfRotated < nums.length) {
    bufferArray.push(nums[indexOfRotated]);
    indexOfRotated++;
  }

  while (lastIndexOfRest >= 0) {
    nums[lastIndexOfRest + shiftNum] = nums[lastIndexOfRest];
    lastIndexOfRest--;
  }

  while (bufferArray.length > 0) {
    nums[bufferArray.length - 1] = bufferArray.pop() as number;
  }
}

function rotate(nums: number[], k: number): void {
  const reverse = (nums: number[], indexStart: number, indexEnd: number) => {
    while (indexStart < indexEnd) {
      const firstElement = nums[indexStart];
      nums[indexStart] = nums[indexEnd];
      nums[indexEnd] = firstElement;
      indexStart++;
      indexEnd--;
    }
  };

  const shiftNum = k % nums.length;

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, shiftNum - 1);
  reverse(nums, shiftNum, nums.length - 1);
}
