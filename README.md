- 1、冒泡排序
> 冒泡排序冒泡排序的过程，就是从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动。每一轮操作，都会将这一轮中最大的元素放置到数组的末尾。假如数组的长度是 n，那么当我们重复完 n 轮的时候，整个数组就有序了。
```javascript
function bubbleSort(nums) {
  const len = nums.length;
  for (let i = 0; i< len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j+1], nums[j]];
      }
    }
  }
  return nums
}
```
- 2、选择排序
> 选择排序的关键字是“最小值”：循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
```javascript
function selectionSort(nums) {
  let len = nums.length;
  let min = 0; // 最小索引的缓存
  for (let i = 0; i < len; i++) {
    min = i // 初始化当前min 为区间第一个
    for (let j = i; j < len; j++) {
      if (nums[j] < nums[min]) {
        min = j
      }
    }
    if (min !== i) {
      [nums[i], nums[min]] = [nums[min], nums[i]]
    }
  }
  return nums
}
```
- 3、插入排序
>插入排序的核心思想是“找到元素在它前面那个序列中的正确位置”。
具体来说，插入排序所有的操作都基于一个这样的前提：当前元素前面的序列是有序的。基于这个前提，从后往前去寻找当前元素在前面那个序列里的正确位置
```javascript
function insertSort (nums) {
  const len = nums.length
  let temp // 缓存当前要插入的元素
  // 默认一个数字是有序的，所以i 初始为 1
  for (let i = 1; i < len; i++) {
    let j = i
    temp = nums[i]
    // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
    while (j > 0 && nums[j - 1] > temp) {
      nums[j] = nums[j - 1]
      j--
      
    }
       // 循环让位，最后得到的 j 就是 temp 的正确索引
    nums[j] = temp
  }
  return nums
}
```
- 4、归并排序
>归并排序是对分治思想的典型应用，它按照如下的思路对分治思想“三步走”的框架进行了填充：
>- 分解子问题：将需要被排序的数组从中间分割为两半，然后再将分割出来的每个子数组各分割为两半，重复以上操作，直到单个子数组只有一个元素为止。
>- 求解每个子问题：从粒度最小的子数组开始，两两合并、确保每次合并出来的数组都是有序的。（这里的“子问题”指的就是对每个子数组进行排序）。
>- 合并子问题的解，得出大问题的解：当数组被合并至原有的规模时，就得到了一个完全排序的数组
```javascript
function mergeSort (nums) {
  function divide (arr) {
    let len = arr.length
    if (len <= 1) {
      return arr;
    }
    let mid = Math.floor(len /2);
    let leftArr = mergeSort(arr.slice(0, mid));
    let rightArr = mergeSort(arr.slice(mid, len));
    arr = merge(leftArr, rightArr)
    return arr
  }
  function merge(arr1, arr2) {
    let l1 = 0, l2 = 0;
    let len1 = arr1.length, len2 = arr2.length;
    let res = []
    while (l1 < len1 && l2 < len2) {
      if (arr1[l1] > arr2[l2]) {
        res.push(arr2[l2])
        l2++
      } else {
        res.push(arr1[l1])
        l1++
      }
    }
    if (l1 < len1) {
      return res.concat(arr1.slice(l1))
    } else {
      return res.concat(arr2.slice(l2))
    }
  }
  return divide(nums)
}
```
- 5、快速排序
> 通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小，再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列。
```javascript
function quickSort (arr, left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    let baseIndex = left;
    let leftIndex = left;
    let rightIndex = right;
    let baseValue = arr[Math.floor(left + (right - left) / 2)];
    while (leftIndex <= rightIndex) {
      while (arr[leftIndex] < baseValue) {
        leftIndex++
      }
      while (arr[rightIndex] > baseValue) {
        rightIndex--;
      }
      if (leftIndex <= rightIndex) {
        [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]]
        leftIndex++;
        rightIndex--;
      }
    }
    baseIndex = leftIndex;
    if(left < baseIndex - 1) {
      // 左子数组以 lineIndex-1 为右边界
      quickSort(arr, left, baseIndex-1)
    }
    // 如果右边子数组的长度不小于1，则递归快排这个子数组
    if(baseIndex < right) {
      // 右子数组以 lineIndex 为左边界
      quickSort(arr, baseIndex, right)
    }
  }
  return arr
}
```
