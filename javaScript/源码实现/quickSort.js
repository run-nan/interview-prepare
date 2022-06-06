/**
 * @param {number[]} nums
 * @return {number[]}
 */


 var sortArray = function(nums) {
    // 为了避免出现耗时的极端情况 先随机打乱数组
    randomShuffle(nums);
    // 排序整个数组（原地修改）
    sort(nums, 0, nums.length - 1);
    return nums;

    // 排序数组nums
    function sort(nums, lo, hi) {
        if (lo >= hi) {
            return;
        }

        /****** 前序位置 ******/
        // 对nums[lo...hi]进行切分
        // 使得nums[lo...p-1] <= nums[p] < nums[p+1..hi]
        let p = partition(nums, lo, hi);
        /*********************/

        sort(nums, lo, p - 1);
        sort(nums, p + 1, hi);
    }

    // 对nums[lo...hi]进行切分
    function partition(nums, lo, hi) {
        // 取第一个位置的元素作为基准元素
        let pivot = nums[lo];
        // 这里把left, right定义为开区间
        // 同时定义 [lo, left) <= pivot; (right, hi] > pivot
        // 之后都要正确维护这个边界区间的定义
        let left = lo + 1;
        let right = hi;
        
        // 当left > right时结束循环 以保证区间[lo, hi]都被覆盖
        while(left <= right) {
            while(left < hi && nums[left] <= pivot) {
                left++;
                // 此while循环结束时 恰好 nums[left] > pivot
            }
            while(right > lo && nums[right] > pivot) {
                right--;
                // 此while循环结束时 恰好 nums[right] <= pivot
            }
            // 此时[lo, left) <= pivot && (right, hi] > pivot

            if (left >= right) {
                break;
            }
            swap(nums, left, right)
        }
        // 将pivot放到合适的位置 即pivot左边元素较小 右边元素较大
        swap(nums, lo, right);
        return right;
    }

    // 随机打乱数组
    function randomShuffle(nums) {
        let len = nums.length;
        for (let i; i < len; i++) {
            // 随机生成[i, n - i]的随机数
            let index = i + Math.floor(Math.random * (len - i));
            swap(nums, i, index);
        }
    }

    // 原地交换数组中的两个元素
    function swap(nums, i, j) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
};