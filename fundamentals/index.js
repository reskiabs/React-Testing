function expect(actual) {
  return {
    toBe: (expected) => {
      if (expected !== actual) {
        throw new Error(`expected ${actual} to be ${expected}`);
      }
    },
  };
}

function test(description, callback) {
  try {
    callback();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.error(`❌ ${description}`);
    console.error(error);
  }
}

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
