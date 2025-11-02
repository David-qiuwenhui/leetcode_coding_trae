import { describe, it, expect } from "vitest";
import { add, isEven } from "./index.js";

describe("add函数测试", () => {
  it("应该正确计算两个正数的和", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("应该正确计算两个负数的和", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it("应该正确计算正数和负数的和", () => {
    expect(add(5, -3)).toBe(2);
  });

  it("应该正确处理0的情况", () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
  });
});

describe("isEven函数测试", () => {
  it("应该正确识别偶数", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  it("应该正确识别奇数", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-3)).toBe(false);
  });
});
