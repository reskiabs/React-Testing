import { spyOn } from "./spy";
import { generateOtp } from "./utils";

describe("Javascript Mock Tutorial", () => {
  test("unpredictable generateOtp", () => {
    const otp1 = generateOtp();
    const otp2 = generateOtp();

    console.log("OTP 1: ", otp1);
    console.log("OTP 2: ", otp2);

    expect(otp1).toBeGreaterThanOrEqual(10000);
    expect(otp1).toBeLessThanOrEqual(99999);

    expect(otp2).toBeGreaterThanOrEqual(10000);
    expect(otp2).toBeLessThanOrEqual(99999);
  });

  test("mock unpredictable Math Random", () => {
    const originalMathRandom = Math.random;

    try {
      Math.random = () => 0.12345;

      const otp = generateOtp();
      expect(otp).toBe(21110);
    } finally {
      Math.random = originalMathRandom;
    }
  });

  test("simple spy", () => {
    const mathSpy = spyOn(Math, "random");
    generateOtp();

    expect(mathSpy.getCallCount()).toBe(1);

    mathSpy.restore();
  });

  test("spy with return value", () => {
    const mathSpy = spyOn(Math, "random");
    mathSpy.mockReturnValue(0.5);

    const otp = generateOtp();

    expect(otp).toBe(55000);
    expect(mathSpy.getCallCount()).toBe(1);

    mathSpy.restore();
  });

  test("spy with custom implementation", () => {
    const mathSpy = spyOn(Math, "random");

    let callNumber = 0;
    mathSpy.mockImplementation(() => {
      callNumber++;
      return callNumber * 0.1;
    });

    const otp1 = generateOtp();
    const otp2 = generateOtp();

    expect(otp1).toBe(19000);
    expect(otp2).toBe(28000);
    expect(mathSpy.getCallCount()).toBe(2);

    mathSpy.restore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
