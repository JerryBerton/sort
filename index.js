// 1、冒泡排序（依次交换最大值，内层循环冒出最大值）
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

// 2、选择排序（依次选择最小并交换）
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

// 3、插入排序
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

// 4、归并排序 （分治思想）
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

// 5、快速排序（分治思想）
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
