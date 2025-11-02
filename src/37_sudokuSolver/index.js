/**
 * ai coding - trae 37. 解数独
 * 解决数独问题的函数
 * @param {character[][]} board - 9x9的数独板，空白格用'.'表示
 * @return {void} - 直接修改输入的board，不返回任何值
 */
function solveSudoku(board) {
  // 检查在指定位置放置数字num是否有效
  function isValid(row, col, num) {
    // 检查同一行
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }

    // 检查同一列
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) {
        return false;
      }
    }

    // 检查3x3子网格
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }

  // 回溯求解函数
  function backtrack() {
    // 遍历整个9x9数独板
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // 找到一个空白格子
        if (board[row][col] === ".") {
          // 尝试填入1-9
          for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();
            if (isValid(row, col, numStr)) {
              // 尝试填入有效数字
              board[row][col] = numStr;

              // 递归尝试求解剩余格子
              if (backtrack()) {
                return true;
              }

              // 如果后续无法求解，回溯
              board[row][col] = ".";
            }
          }
          // 当前格子无法填入有效数字，返回false
          return false;
        }
      }
    }
    // 所有格子都已填满，求解成功
    return true;
  }

  // 开始求解
  backtrack();
}

export default solveSudoku;
