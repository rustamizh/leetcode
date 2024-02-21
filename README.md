# Leetcode problems solving (using TypeScript)

## [Arrays](#arrays)


<details>
<summary>Table of contents</summary>

- [Merge Sorted Array](#merge-sorted-array)
- [Remove Element](#remove-element)
- [Remove Duplicates from Sorted Array](#remove-duplicates-from-sorted-array)
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
- ``-109 <= nums1[i], nums2[j] <= 109``
 

**Follow up:** Can you come up with an algorithm that runs in ``O(m + n)`` time?
</details> 

<details>
<summary>Solution</summary>  

```javascript
/**
 Do not return anything, modify nums1 in-place instead.
 */
export function merge(
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

- ``1 <= nums.length <= 3 * 104``
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