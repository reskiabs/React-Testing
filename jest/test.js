test("sum work as expected", () => {
  const sum = (a, b) => a + b;
  let expectation = 96;
  let reality = sum(90, 6);
  expect(reality).toBe(expectation);
});

test("substract work as expected", () => {
  const substract = (a, b) => a - b;
  let expectation = 84;
  let reality = substract(90, 6);
  expect(reality).toBe(expectation);
});
