var maxAreaOfIsland = function(grid) {
    const m = grid.length, n = grid[0].length;

    function dfs(i, j) {
        let area = 1; // (i,j) 这个格子
        grid[i][j] = 0; // 标记 (i,j) 访问过
        for (const [x, y] of [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]]) { // 左右上下
            if (0 <= x && x < m && 0 <= y && y < n && grid[x][y]) {
                // 把统计岛屿面积的任务交给其他人去处理，自己只需累加其他人统计出来的岛屿面积
                area += dfs(x, y);
            }
        }
        return area;
    }

    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j]) { // 是陆地，且之前没有访问过
                ans = Math.max(ans, dfs(i, j));
            }
        }
    }
    return ans;
};