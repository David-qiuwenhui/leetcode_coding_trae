import { describe, it, expect } from "vitest";
import solveSudoku from "./index.js";

describe("数独求解器测试", () => {
  it("应该正确解决基础示例数独", () => {
    // 示例输入
    const inputBoard = [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];

    // 预期输出
    const expectedBoard = [
      ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
      ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
      ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
      ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
      ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
      ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
      ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
      ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
      ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
    ];

    // 创建输入的深拷贝，因为solveSudoku会直接修改输入
    const boardCopy = inputBoard.map((row) => [...row]);

    // 调用求解函数
    solveSudoku(boardCopy);

    // 验证结果
    expect(boardCopy).toEqual(expectedBoard);
  });

  it("应该验证解决方案的有效性", () => {
    // 测试一个部分填充的数独
    const inputBoard = [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];

    const boardCopy = inputBoard.map((row) => [...row]);
    solveSudoku(boardCopy);

    // 验证每行都包含1-9且不重复
    for (let row = 0; row < 9; row++) {
      const seen = new Set();
      for (let col = 0; col < 9; col++) {
        const cell = boardCopy[row][col];
        expect(cell).toMatch(/^[1-9]$/);
        expect(seen.has(cell)).toBe(false);
        seen.add(cell);
      }
    }

    // 验证每列都包含1-9且不重复
    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let row = 0; row < 9; row++) {
        const cell = boardCopy[row][col];
        expect(seen.has(cell)).toBe(false);
        seen.add(cell);
      }
    }

    // 验证每个3x3子网格都包含1-9且不重复
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Set();
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const cell = boardCopy[boxRow * 3 + row][boxCol * 3 + col];
            expect(seen.has(cell)).toBe(false);
            seen.add(cell);
          }
        }
      }
    }
  });
});
