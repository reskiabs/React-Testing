export function spyOn(obj, methodName) {
  const originalMethod = obj[methodName];

  if (typeof originalMethod !== "function") {
    throw new Error(`${methodName} is not a function`);
  }

  let callCount = 0;
  let callArgs = [];
  let mockReturn = null;
  let customMock = null;

  function mockFunction(...args) {
    callCount++;
    callArgs.push(args);

    if (customMock) {
      return customMock(...args);
    }

    if (mockReturn !== null) {
      return mockReturn;
    }

    return originalMethod.apply(obj, args);
  }

  obj[methodName] = mockFunction;

  return {
    getCallCount() {
      return callCount;
    },
    mockReturnValue(value) {
      mockReturn = value;
    },
    mockImplementation(fn) {
      customMock = fn;
    },
    restore: () => {
      obj[methodName] = originalMethod;
      callCount = 0;
      callArgs = [];
    },
  };
}
