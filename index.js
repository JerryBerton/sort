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
  if (arr.length <= 1) {
    return arr
  }
  // lineIndex表示下一次划分左右子数组的索引位
  const lineIndex = partintion(arr, left, right)
  // 如果左边子数组的长度不小于1，则递归排序这个子数组
  if (left < lineIndex - 1) {
    quickSort(arr, left, lineIndex - 1)
  }
  // 如果右边子数组的长度不小于1，则递归快拍这个字数组
  if (lineIndex < right) {
    quickSort(arr, lineIndex, right)
  }
  return arr
}


function partintion(arr, left, right) {
  // 基准值
  let pivotValue = arr[Math.floor(left + (right - left) / 2)]
  // 初始化左右指针
  let l = left;
  let r = right;
  // 左右指针不越界
  while (l <= r) {
    // 左指针所指元素小于基准值，左指针右移
    while (arr[l] < pivotValue) {
      l++
    }
    while (arr[r] > pivotValue) {
      r--
    }
    // 若左指针不大于右指针，则意味着基准值左边存在较大元素或者右边存在较小
    // 元素。交换两个元素确保左右两侧有序
    if (l <= r) {
      [arr[l], arr[r]] = [arr[r], arr[l]]
      l++;
      r--;
    }
  }
  return l
}
