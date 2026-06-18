var solveSudoku = function(board) {
    const rowHas = Array.from({length: 9}, () => Array(9).fill(false)); // rowHas[i][x] 表示 i 行是否有数字 x
    const colHas = Array.from({length: 9}, () => Array(9).fill(false)); // colHas[j][x] 表示 j 列是否有数字 x
    const subBoxHas = Array.from({length: 3}, () => Array.from({length: 3}, () => Array(9).fill(false))); // subBoxHas[i'][j'][x] 表示 (i',j') 宫是否有数字 x
    const emptyPos = []; // 空格子的位置

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const b = board[i][j];
            if (b === '.') {
                emptyPos.push([i, j]); // 记录空格子的位置
            } else {
                const x = b.charCodeAt(0) - '1'.charCodeAt(0); // 字符 '1'~'9' 转成数字 0~8
                // 标记行、列、宫包含数字 x
                rowHas[i][x] = colHas[j][x] = subBoxHas[Math.floor(i / 3)][Math.floor(j / 3)][x] = true;
            }
        }
    }

    // 计算 (i, j) 这个空格子的待定数字个数
    function getCandidates(i, j) {
        let candidates = 9;
        for (let x = 0; x < 9; x++) {
            if (rowHas[i][x] || colHas[j][x] || subBoxHas[Math.floor(i / 3)][Math.floor(j / 3)][x]) {
                candidates--;
            }
        }
        return candidates;
    }

    const emptyPQ = new MinPriorityQueue(e => e[0]);
    for (const [i, j] of emptyPos) {
        emptyPQ.enqueue([getCandidates(i, j), i, j]);
    }

    // 每次递归，选一个空格子，枚举填入的数字
    function dfs() {
        if (emptyPQ.isEmpty()) { // 所有格子都已填入数字
            return true; // 完成数独
        }

        // 数独玩法：优先考虑待定数字个数最少的空格子
        const [_, i, j] = emptyPQ.dequeue();

        let candidates = 0; // 受之前填入的数字影响，实际待定数字个数可能比入堆时的少，需要重新计算
        // 枚举没填过的数字 x，填入 board[i][j]
        for (let x = 0; x < 9; x++) {
            if (rowHas[i][x] || colHas[j][x] || subBoxHas[Math.floor(i / 3)][Math.floor(j / 3)][x]) {
                continue; // x 填过了
            }

            // 填入 board[i][j]
            board[i][j] = (x + 1).toString(); 
            // 标记行、列、宫包含数字 x
            rowHas[i][x] = colHas[j][x] = subBoxHas[Math.floor(i / 3)][Math.floor(j / 3)][x] = true;

            // 填下一个空格子
            if (dfs()) {
                return true; // 完成数独
            }

            // 恢复现场（撤销）
            // 注意 board[i][j] 无需恢复现场，因为我们会直接覆盖掉之前填入的数字
            rowHas[i][x] = colHas[j][x] = subBoxHas[Math.floor(i / 3)][Math.floor(j / 3)][x] = false;

            // 统计待定数字个数
            candidates++;
        }

        // 恢复现场（撤销）
        emptyPQ.enqueue([candidates, i, j]); // 重新入堆（更新待定数字个数）
        // 所有填法都不行，说明之前（祖先节点）的填法是错的
        return false;
    }

    dfs();
};