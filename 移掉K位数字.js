var removeKdigits = function (num, k) {
  const stack = [];
  for (let i = 0; i < num.length; i++) {
    const c = num[i];
    while (k > 0 && stack.length && stack[stack.length - 1] > c) {
      stack.pop();
      k--;
    }
    if (c != '0' || stack.length != 0) {
      stack.push(c);
    }
  }
  while (k > 0) {
    stack.pop();
    k--;
  }
  return stack.length == 0 ? "0" : stack.join('');
};
