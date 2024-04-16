/**
    Идём по массиву с конца к началу
  */
export function canJump(nums: number[]): boolean {
  /**
      Заводим переменную индекса элемента, возможность доступности которого мы выясняем.
      Первоначально инициализируем её последним элементом массива.
    */
  let lastJumpIndex = nums.length - 1;

  /**
      Идём по массиву влево, начиная от элемента левее исследуемого.

      Если значение текущего элемента, т.е. количество шагов вправо, которое мы можем от него сделать,
      больше или равно разнице индексов между ним и исследуемым, т.е. количеству шагов между ними, считаем,
      что от него мы можем достичь исследуемого, поэтому меняем исследуемый на текущий и выясняем доступность уже до него.

      Иначе, оставляем исследуемый элемент тем же и сдвигаем текущий левее, повторяя алгоритм доступности.
    */
  for (
    let currentElementIdx = lastJumpIndex - 1;
    currentElementIdx > 0;
    currentElementIdx--
  ) {
    if (nums[currentElementIdx] >= lastJumpIndex - currentElementIdx) {
      lastJumpIndex = currentElementIdx;
    }
  }

  /**
      Т.к. currentElementIdx в условии цикла был больше нуля, то в крайнем случае мы доберёмся
      не менее чем до второго элемента.

      В конце сравниваем, что количество доступных шагов из первого элемента больше или равно
      индексу элемента, доступность которого мы выясняем в конце алгоритма.
    */

  return nums[0] >= lastJumpIndex;
}
