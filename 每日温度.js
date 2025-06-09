var dailyTemperatures = function (temperatures) {
    // 单调递减栈
    let stack = [];
    let n = temperatures.length;
    let res = new Array(n).fill(0);

    // 遍历每日温度，维护一个单调栈
    for (let i = 0; i < n; i++) {
        // 当日温度大于栈顶温度，说明栈顶温度的升温日找到了，栈顶出栈并计算天数；继续判断栈顶元素
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const top = stack.pop();
            res[top] = i - top;
        }
        // 栈为空 或 每日温度小于等于栈顶温度 => 直接入栈
        stack.push(i)
    }

    return res;
};
