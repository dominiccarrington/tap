import { tap } from "../src/index";

class TestClass {
  count = 0;

  setCount(newCount: number) {
    this.count = newCount;

    return this.count;
  }
}

test("tap without callback returns a proxy", () => {
  const t = tap(new TestClass());
  expect(t.setCount(10)).toBe(t);
  expect(t.count).toBe(10);
});

test("tap with callback returns the object", () => {
  const t = tap(new TestClass(), (t) => {
    t.setCount(20);
  });

  expect(t.count).toBe(20);
  expect(t.setCount(10)).toBe(10);
});
