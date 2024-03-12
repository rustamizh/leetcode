# Leetcode problems solutions (in TypeScript)

## [Arrays](#arrays)


<details>
<summary>Table of contents</summary>

- [Merge Sorted Array](#merge-sorted-array)
- [Remove Element](#remove-element)
- [Remove Duplicates from Sorted Array](#remove-duplicates-from-sorted-array)
- [Remove Duplicates from Sorted Array II](#remove-duplicates-from-sorted-array-ii)
- [Majority Element](#majority-element)
- [Rotate Array](#rotate-array)
- [Best Time To Buy And Sell Stock](#best-time-to-buy-and-sell-stock)
- [Best Time To Buy And Sell Stock II](#best-time-to-buy-and-sell-stock-ii)
</details>

## <a name="arrays"></a> Arrays

### <a name="merge-sorted-array"></a> Merge Sorted Array

<details>
<summary>Problem</summary>  

You are given two integer arrays ``nums1`` and ``nums2``, sorted in non-decreasing order, and two integers ``m`` and ``n``, representing the number of elements in ``nums1`` and ``nums2`` respectively.

Merge ``nums1`` and ``nums2`` into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array ``nums1``. To accommodate this, ``nums1`` has a length of ``m + n``, where the first ``m`` elements denote the elements that should be merged, and the last ``n`` elements are set to ``0`` and should be ignored. ``nums2`` has a length of ``n``.

**Example 1:**

> **Input:** nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3  
**Output:** [1,2,2,3,5,6]  
**Explanation:** The arrays we are merging are [1,2,3] and [2,5,6].  
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

**Example 2:**

> **Input:** nums1 = [1], m = 1, nums2 = [], n = 0  
**Output:** [1]  
**Explanation:** The arrays we are merging are [1] and [].  
The result of the merge is [1].

**Example 3:**

> **Input:** nums1 = [0], m = 0, nums2 = [1], n = 1  
**Output:** [1]  
**Explanation:** The arrays we are merging are [] and [1].  
The result of the merge is [1].  
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
 

**Constraints:**

- ``nums1.length == m + n``
- ``nums2.length == n``
- ``0 <= m, n <= 200``
- ``1 <= m + n <= 200``
- ``-10^9 <= nums1[i], nums2[j] <= 10^9``
 

**Follow up:** Can you come up with an algorithm that runs in ``O(m + n)`` time?
</details> 

<details>
<summary>Solution</summary>  

```javascript
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
    /**
     Решение заключается в том, что мы будем заполнять целевой массив с конца - 
     то есть находить большие элементы и вставлять их в конец целевого массива.

     Вводим индексы вставки (последний элемент целевого массива)
     Индекс большего элемента первого массива (m - 1)
     И большего элемента второго массива (n - 1)
    */
  let insertionIndex = m + n - 1;
  let numsOneBiggestElementIndex = m - 1;
  let numsTwoBiggestElementIndex = n - 1;

    /**
     На каждой итерации будем убирать элементы из второго массива,
     поэтому ориентируемся на момент, когда он опустеет.

     Если второй массив изначально пуст, в цикл не зайдем и ответ будет равен
     исходному первому массиву.
    */
  while (nums2.length !== 0) {
    /**
     Если больший элемент второго массива больше или равен большему элементу целевого
    перемещаем его в место вставки - в конец целевого массива.
    
    То же самое делаем, если индекс большего элемента целевого массива равен -1.
    Это значит, что целевой массив пуст и нам просто нужно последовательно переложить элементы
    из второго в целевой.

    Не забываем декрементировать индекс большего элемента второго массива, т.к. мы удаляем из него элемент.
    */
    if (
      nums2[numsTwoBiggestElementIndex] >= nums1[numsOneBiggestElementIndex] ||
      numsOneBiggestElementIndex === -1
    ) {
      nums1[insertionIndex] = nums2.pop() as number;
      numsTwoBiggestElementIndex--;
    } else {
    /**
    Если больший элемент целевого массива больше большего элемента второго, перемещаем его в конец целевого -
    меняем его местами с элементом в месте вставки.

    Декрементируем индекс наибольшего элемента целевого массива, чтобы он указывал на элемент перед перемещённым.
    */
      const numsOneBiggestElement = nums1[numsOneBiggestElementIndex];
      nums1[numsOneBiggestElementIndex] = nums1[insertionIndex];
      nums1[insertionIndex] = numsOneBiggestElement;
      numsOneBiggestElementIndex--;
    }

    /**
    На каждом круге декрементируем индекс вставки
    */
    insertionIndex--;
  }
}
```
</details> 

### <a name="remove-element"></a> Remove Element

<details>
<summary>Problem</summary>  

Given an integer array ``nums`` and an integer ``val``, remove all occurrences of ``val`` in ``nums`` in-place. The order of the elements may be changed. Then return *the number of elements in* ``nums`` *which are not equal to* ``val``.

Consider the number of elements in ``nums`` which are not equal to ``val`` be ``k``, to get accepted, you need to do the following things:

- Change the array ``nums`` such that the first ``k`` elements of ``nums`` contain the elements which are not equal to ``val``. The remaining elements of ``nums`` are not important as well as the size of ``nums``.
- Return ``k``.

**Example 1:**

> **Input:** nums = [3,2,2,3], val = 3  
**Output:** 2, nums = [2,2,\_,\_]  
**Explanation:** Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Example 2:**

> **Input:** nums = [0,1,2,2,3,0,4,2], val = 2  
**Output:** 5, nums = [0,1,4,0,3,\_,\_,\_]  
**Explanation:** Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Constraints:**

- ``0 <= nums.length <= 100``
- ``0 <= nums[i] <= 50``
- ``0 <= val <= 100``
</details> 

<details>
<summary>Solution</summary>  

```javascript

  /**
    Внимание: необходимо вернуть количество элементов которые НЕ РАВНЫ искомому.
  */
function removeElement(nums: (number | string)[], val: number): number {
    /**
    Вводим переменную подсчета вхождений значения.

    Найденные значения будем превращать в '_' и перемещать в конец массива,
    поэтому добавляем переменную - индекс последнего перемещенного элемента.
    Его инициализируем как nums.length - несуществующий индекс после последнего элемента.
    */
  let numberOfNonValueOccurences = 0;
  let lastValIndex = nums.length;

  for (let idx = nums.length - 1; idx >= 0; idx--) {
    /**
    Бежим по массиву в цикле в обратном порядке - от последнего элемента к первому включительно (idx >= 0).

    Если нашли искомый элемент - вставляем его в позицию перед последним найденным (lastValIndex - 1),
    а элемент оттуда вставляем в текущую позицию.

    После чего декрементируем индекс последнего найденного элемента.

    Если элемент не равен искомому - инкрементируем счетчик найденных элементов.
    */

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

/**
    Короткое решение.
  */
function removeElement(nums: number[], val: number): number {
  /**
    Заводим индекс последнего элемента, НЕ РАВНОГО искомому, равный нулю. 
  */
  let lastNonValueElementIndex = 0;

  /**
    Последовательно бежим по массиву от первого элемента, к последнему. 

    Если текущий элемент не равен искомому, записываем его в индекс lastNonValueElementIndex.
    Инкрементируем на единицу счетчик для вставки следующего элемента, не равного искомому.

    Если текущий элемент равен искомому - пропускаем его и бежим дальше.

    В итоге все вхождения искомого элемента (кроме последнего) перезапишутся элементами, не равными искомому.
  */
  nums.forEach((num) => {
    if (num !== val) {
      nums[lastNonValueElementIndex] = num;
      lastNonValueElementIndex++;
    }
  });

  return lastNonValueElementIndex;
}
```
</details> 


### <a name="remove-duplicates-from-sorted-array"></a> Remove Duplicates from Sorted Array

<details>
<summary>Problem</summary>  

Given an integer array ``nums`` sorted **in non-decreasing order**, remove the duplicates in-place such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return *the number of unique elements* in ``nums``.

Consider the number of unique elements of ``nums`` to be ``k``, to get accepted, you need to do the following things:
Consider the number of elements in ``nums`` which are not equal to ``val`` be ``k``, to get accepted, you need to do the following things:

- Change the array ``nums`` such that the first ``k`` elements of ``nums`` contain the unique elements in the order they were present in ``nums`` initially. The remaining elements of ``nums`` are not important as well as the size of ``nums``.
- Return ``k``.

**Example 1:**

> **Input:** nums = [1,1,2]  
**Output:** 2, nums = [1,2,\_]  
**Explanation:** Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Example 2:**

> **Input:** nums = [0,0,1,1,1,2,2,3,3,4]  
**Output:** 5, nums = [0,1,2,3,4,\_,\_,\_,\_,\_]  
**Explanation:** Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Constraints:**

- ``1 <= nums.length <= 3 * 10^4``
- ``-100 <= nums[i] <= 100``
- ``nums is sorted in non-decreasing order.``
</details> 

<details>
<summary>Solution</summary>  

```javascript

function removeDuplicates(nums: number[]): number {
  /**
    Заводим переменную с индексом последнего не дублирующегося элемента.
  */
  let indexOfNonDuplicateElement = 0;

  /**
    Бежим по массиву, и как только находим элемент, отличный от последнего недублирующегося,
    устанавливаем его в позицию после недублирующегося, повышая индекс.

    Возвращаем количество недублирующихся элементов, т.е. индекс последнего + 1.
  */
  nums.forEach((num) => {
    if (num !== nums[indexOfNonDuplicateElement]) {
      nums[++indexOfNonDuplicateElement] = num;
    }
  });

  /**
    Возвращаем количество недублирующихся элементов, т.е. индекс последнего + 1.
  */
  return ++indexOfNonDuplicateElement;
}
```
</details> 

### <a name="remove-duplicates-from-sorted-array-ii"></a> Remove Duplicates from Sorted Array II

<details>
<summary>Problem</summary>  

Given an integer array ``nums`` sorted in **non-decreasing order**, remove some duplicates in-place such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array ``nums``. More formally, if there are ``k`` elements after removing the duplicates, then the first ``k`` elements of ``nums`` should hold the final result. It does not matter what you leave beyond the first ``k`` elements.

Return ``k`` *after placing the final result in the first* ``k`` *slots of* ``nums``.

Do **not** allocate extra space for another array. You must do this by **modifying the input array** in-place with O(1) extra memory.

**Example 1:**

> **Input:** nums = [1,1,1,2,2,3]  
**Output:** 5, nums = [1,1,2,2,3,\_]  
**Explanation:** Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Example 2:**

> **Input:** nums = [0,0,1,1,1,1,2,3,3]    
**Output:** 7, nums = [0,0,1,1,2,3,3,\_,\_]  
**Explanation:** Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

**Constraints:**

- ``1 <= nums.length <= 3 * 10^4``
- ``-10^4 <= nums[i] <= 10^4``
- ``nums is sorted in **non-decreasing order**.``
</details> 

<details>
<summary>Solution</summary>  

```javascript

function removeDuplicates(nums: number[]): number {
  /**
    Заводим переменную с индексом 2, т.е. начинаем алгоритм с третьего элемента,
      т.к. первые два автоматически соответствуют условию.
  */
  let indexToInsertElement = 2;

  /**
    В цикле пропускаем два первых элемента, начиная с третьего проверяем,
    не дублирует ли текущий элемент элемент на две позиции назад.

    Если не дублрует - инсёртим его сюда и инкрементируем индекс.

    Иначе - идём дальше.
  */
  nums.forEach((num, idx) => {
    if (idx > 1 && num !== nums[indexToInsertElement - 2]) {
      nums[indexToInsertElement] = num;
      indexToInsertElement++;
    }
  });

  return indexToInsertElement;
}
```
</details> 


### <a name="majority-element"></a> Majority Element

<details>
<summary>Problem</summary>  

Given an array ``nums`` of size ``n``, return *the majority element*.

The majority element is the element that appears more than ``⌊n / 2⌋`` times. You may assume that the majority element always exists in the array.

**Example 1:**

> **Input:** nums = [3,2,3]  
**Output:** 3  

**Example 2:**

> **Input:** nums = [2,2,1,1,1,2,2]  
**Output:** 2  

**Constraints:**

- ``n == nums.length``
- ``1 <= n <= 5 * 10^4``
- ``-10^9 <= nums[i] <= 10^9.``

**Follow-up**: Could you solve the problem in linear time and in ``O(1)`` space?
</details> 

<details>
<summary>Solution</summary>  

```javascript

function majorityElement(nums: number[]): number {
  /**
    Заводим две переменные, в которых будем хранить элемент и счетчик.
  */
  let element: number = 0;
  let count: number = 0;

  /**
    Решение заключается в том, что мы сохраняем первый элемент, и если он попадается снова,
    мы инкрементируем счетчик, если попадается не он - декрементируем.

    Когда счётчик дойдет до нуля - меняем сохранённый элемент и продолжаем алгоритм.

    Таким образом элемент, превалирующий числом, окажется в переменной element.
  */
  for (let num of nums) {
      if (count === 0) {
          element = num;
      }

      count += element === num ? 1 : -1;
  }

  return element;
};


/**
  Второе решение за O(n*logn) - скорость быстрой сортировки.
*/
function majorityElement(nums: number[]): number {
  /**
    Сортируем массив по возрастанию.
  */
  nums.sort((a, b) => a - b);

  /**
    Берём и возвращаем элемент средний по индексу (+1 для четных массивов).
  */
  const middleIndex = Math.ceil(nums.length/2);
  const element = nums[middleIndex];

  return element;
};
```
</details> 


### <a name="rotate-array"></a> Rotate Array

<details>
<summary>Problem</summary>  

Given an integer array ``nums``, rotate the array to the right by ``k`` steps, where ``k`` is non-negative.

**Example 1:**

> **Input:** nums = [1,2,3,4,5,6,7], k = 3   
**Output:** [5,6,7,1,2,3,4]  
**Explanation:**  
rotate 1 steps to the right: [7,1,2,3,4,5,6]  
rotate 2 steps to the right: [6,7,1,2,3,4,5]  
rotate 3 steps to the right: [5,6,7,1,2,3,4]  

> **Input:** nums = [-1,-100,3,99], k = 2   
**Output:** [3,99,-1,-100]  
**Explanation:**  
rotate 1 steps to the right: [99,-1,-100,3]  
rotate 2 steps to the right: [3,99,-1,-100]  

**Constraints:**

- ``1 <= nums.length <= 10^5``
- ``-2^31 <= nums[i] <= 2^31 - 1``
- ``0 <= k <= 10^5``

**Follow-up**: 
- Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.
- Could you do it in-place with ``O(1)`` extra space?
</details> 

<details>
<summary>Solution</summary>  

```javascript

/**
  Решение со сдвигом на 1 элемент за раз (падает по таймауту на большом объёме данных).
*/
function rotateByOne(nums: number[], k: number): void {
  /**
    Определяем шаг сдвига как целочисленный остаток от деления переданного шага на длину массива.
    Т.к. если переданный шаг сдвига больше длины массива,
    сдвиг сводится к этому остатку (nums = [2, 1], k = 5)
  */
  let shiftNum = k % nums.length;

  /**
    Делаем сдвиг по одному указанное количество раз.
  */
  while (shiftNum > 0) {
    rotateRight(nums);
    shiftNum--;
  }

  /**
    Определяем функцию сдвига, которая циклически сдвигает один элемент вправо.
  */
  function rotateRight(nums: number[]) {
    const lastElement = nums[nums.length - 1];

    for (let idx = nums.length - 2; idx >= 0; idx--) {
      nums[idx + 1] = nums[idx];
    }

    nums[0] = lastElement;
  }
}

/**
  Решение с разворотом массива встроенными в язык методами.
*/
function rotateReverse(nums: number[], k: number): void {
  /**
    Определяем шаг сдвига как целочисленный остаток от деления переданного шага на длину массива.
    Т.к. если переданный шаг сдвига больше длины массива,
    сдвиг сводится к этому остатку (nums = [2, 1], k = 5)
  */
  const shiftNum = k % nums.length;

  /**
    Определяем индекс среза массива как длина исходного минус сдвиг.
  */
  const cliceIndex = nums.length - shiftNum;

  /**
    Отрезаем часть, которую необходимо сдвинуть.
  */
  const spliced = nums.splice(cliceIndex);

  /**
    Разворачиваем остаток.
  */
  nums.reverse();

  /**
    Пушим в остаток элементы из отрезанной части, начиная с конца (по сути тоже разворачивая).
  */
  while (spliced.length > 0) {
    nums.push(spliced.pop() as number);
  }

  /**
    Разворачиваем результат.
  */
  nums.reverse();
}


/**
  Решение с дополнительным массивом.
*/
function rotateExtraArray(nums: number[], k: number): void {
  /**
    Определяем шаг сдвига как целочисленный остаток от деления переданного шага на длину массива.
    Т.к. если переданный шаг сдвига больше длины массива,
    сдвиг сводится к этому остатку (nums = [2, 1], k = 5)
  */
  const shiftNum = k % nums.length;

  /**
    Вводим индекс сдвигаемой части, как длина минус сдвиг.
    Таким образом получаем индекс первого элемента части,
    которую нужно сдвинуть.
  */
  let indexOfRotated = nums.length - shiftNum;

  /**
    Вводим индекс последнего элемента оставшейся части.
  */
  let lastIndexOfRest = indexOfRotated - 1;

  /**
    Вводим дополнительный массив.
  */
  const bufferArray: number[] = [];

  /**
    Пока индекс сдвигаемой части находится в пределах массива nums,
    пушим по одному элементы сдвигаемой части в дополнительный массив.
  */
  while (indexOfRotated < nums.length) {
    bufferArray.push(nums[indexOfRotated]);
    indexOfRotated++;
  }

  /**
    Начиная с последнего индекса оставшейся части, переносим её элементы
    от текущей позиции на размер сдвига, пока не дойдем до первого элемента.
  */
  while (lastIndexOfRest >= 0) {
    nums[lastIndexOfRest + shiftNum] = nums[lastIndexOfRest];
    lastIndexOfRest--;
  }

  /**
    Пока дополнительный массив не опустеет, помещаем элементы из него
    в освободившуюся первую часть исходного массива,
    используя в качестве индекса длину дополнительного массива.
  */
  while (bufferArray.length > 0) {
    nums[bufferArray.length - 1] = bufferArray.pop() as number;
  }
}


/**
  Каноничное решение.
*/
function rotate(nums: number[], k: number): void {
  /**
    Вводим метод разворота массива на месте,
    принимающий массив, индекс начала разворота и индекс конца,
    в котором меняем крайние элементы местами, сужая диапазон замены,
    пока не дойдем до пересечения индексов начала и конца.
  */
  const reverse = (nums: number[], indexStart: number, indexEnd: number) => {
    while (indexStart < indexEnd) {
      const firstElement = nums[indexStart];
      nums[indexStart] = nums[indexEnd];
      nums[indexEnd] = firstElement;
      indexStart++;
      indexEnd--;
    }
  };

  /**
    Определяем шаг сдвига как целочисленный остаток от деления переданного шага на длину массива.
    Т.к. если переданный шаг сдвига больше длины массива,
    сдвиг сводится к этому остатку (nums = [2, 1], k = 5)
  */
  const shiftNum = k % nums.length;

  /**
    Сначала разворачиваем весь массив.
    nums = [1, 2, 3, 4, 5, 6, 7], k = 3 
    [7, 6, 5, 4, 3, 2, 1];
  */
  reverse(nums, 0, nums.length - 1);
  /**
    Затем разворачиваем часть, от начала (прежнего конца) до шага сдвига.
    nums = [1, 2, 3, 4, 5, 6, 7], k = 3 
    [5, 6, 7, 4, 3, 2, 1];
  */
  reverse(nums, 0, shiftNum - 1);

  /**
    Затем разворачиваем остаток.
    nums = [1, 2, 3, 4, 5, 6, 7], k = 3 
    [5, 6, 7, 1, 2, 3, 4];
  */
  reverse(nums, shiftNum, nums.length - 1);
}
```
</details> 


### <a name="best-time-to-buy-and-sell-stock"></a> Best Time To Buy And Sell Stock

<details>
<summary>Problem</summary>  

You are given an array ``prices`` where ``prices[i]`` is the price of a given stock on the ``ith`` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day** in the future to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return ``0``.

**Example 1:**

> **Input:** prices = [7,1,5,3,6,4]  
**Output:** 5  
**Explanation:**  Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.  
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

**Example 2:**

> **Input:** prices = [7,6,4,3,1]  
**Output:** 0  
**Explanation:** In this case, no transactions are done and the max profit = 0.

**Constraints:**

- ``1 <= prices.length <= 10^5``
- ``0 <= prices[i] <= 10^4``
</details> 

<details>
<summary>Solution</summary>  

```javascript

function maxProfit(prices: number[]): number {
  /**
    Заводим переменную с днём лучшей цены для продажи, куда сразу записываем последний элемент.
    Также заводим переменную с максимальной найденной выгодой, куда записываем значение 0.
  */
  let bestSellPrice = prices[prices.length - 1];
  let maxProfit = 0;


  /**
    Идём по массиву в обратном порядке.
  */
  for (let i = prices.length - 2; i >= 0; i--) {
      /**
        Если находим элемент с большей стоимостью продажи, чем был найден ранее, обновляем значение bestSellPrice.
      */
      if  (prices[i] >= bestSellPrice) {
          bestSellPrice = prices[i];
      } else {
        /**
          Если находим день со стоимостью акций меньше bestSellPrice, 
          считаем разницу между ним и bestSellPrice.

          Если найденное значение больше maxProfit - обновляем его значение,
          иначе - оставляем значение maxProfit прежним.
        */
        maxProfit = Math.max(maxProfit, bestSellPrice - prices[i]);
      }
  }

  return maxProfit;
};
```
</details> 

### <a name="best-time-to-buy-and-sell-stock-ii"></a> Best Time To Buy And Sell Stock II

<details>
<summary>Problem</summary>  

You are given an array ``prices`` where ``prices[i]`` is the price of a given stock on the ``ith`` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return *the **maximum** profit you can achieve*.

**Example 1:**

> **Input:** prices = [7,1,5,3,6,4]  
**Output:** 7  
**Explanation:**  Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.  
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.  
Total profit is 4 + 3 = 7.

**Example 2:**

> **Input:** prices = [1,2,3,4,5]  
**Output:** 4  
**Explanation:** Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.  
Total profit is 4.

**Example 3:**

> **Input:** prices = [7,6,4,3,1]  
**Output:** 0  
**Explanation:** There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.

**Constraints:**

- ``1 <= prices.length <= 3 * 10^4``
- ``0 <= prices[i] <= 10^4``
</details> 

<details>
<summary>Solution</summary>  

```javascript

function maxProfit(prices: number[]): number {
  /**
    Заводим переменную максимальной прибыли, которую инициализируем как 0.
    Также переменную стоимости покупки, куда сразу записываем первый элемент массива.
  */
  let maxProfit = 0;
  let buyPrice = prices[0];

  /**
    Идём по массиву в цикле.
  */
  for (let i = 0; i < prices.length; i++) {
    /**
      Проверяем, если следующий элемент дешевле текущего или его не существует (конец массива), 
      значит это конец роста цены.

      Вычитаем из стоимости текущего дня стоимость последней покупки и прибавляем результат к maxProfit.

      После чего записываем в стоимость покупки цену следующего дня.
    */
    if (prices[i + 1] === undefined || prices[i + 1] < prices[i]) {
      maxProfit += prices[i] - buyPrice;
      buyPrice = prices[i + 1];
    }
  }

  return maxProfit;
}
```
</details> 
