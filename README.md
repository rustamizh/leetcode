# Leetcode problems solving (using TypeScript)

## [Arrays](#arrays)


<details>
<summary>Table of contents</summary>

- [Merge Sorted Array](#merge-sorted-array)
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