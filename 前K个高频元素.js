var topKFrequent = function(nums, k) {
    // 第一步：统计每个元素的出现次数
    const cnt = new Map();
    for (const x of nums) {
        cnt.set(x, (cnt.get(x) ?? 0) + 1);
    }
    const maxCnt = Math.max(...cnt.values());

    // 第二步：把出现次数相同的元素，放到同一个桶中
    const buckets = Array.from({ length: maxCnt + 1 }, () => []);
    for (const [x, c] of cnt.entries()) {
        buckets[c].push(x);
    }

    // 第三步：倒序遍历 buckets，把出现次数前 k 大的元素加入答案
    const ans = [];
    for (let i = maxCnt; i >= 0 && ans.length < k; i--) {
        ans.push(...buckets[i]);
    }
    return ans;
};
