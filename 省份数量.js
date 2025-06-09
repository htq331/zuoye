var findCircleNum = function(isConnected) {
  const rows = isConnected.length;
  const visited = new Set();//记录是否访问过
  let count = 0;//省份数量
  for (let i = 0; i < rows; i++) {
      if (!visited.has(i)) {//如果没访问过
          dfs(isConnected, visited, rows, i);//深度优先遍历
          count++;//省份数量+1
      }
  }
  return count;
};

const dfs = (isConnected, visited, rows, i) => {
  for (let j = 0; j < rows; j++) {
      if (isConnected[i][j] == 1 && !visited.has(j)) {//如果i，j相连接
          visited.add(j);
          dfs(isConnected, visited, rows, j);//递归遍历
      }
  }
};
