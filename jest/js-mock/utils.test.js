import { generateOtp } from "./utils";

jest.mock("./utils", () => {
  return {
    generateOtp: jest.fn(),
  };
});

describe("Javascript Mock Tutorial", () => {
  // test("unpredictable generateOtp", () => {
  //   const otp1 = generateOtp();
  //   const otp2 = generateOtp();

  //   console.log("OTP 1: ", otp1);
  //   console.log("OTP 2: ", otp2);

  //   expect(otp1).toBeGreaterThanOrEqual(10000);
  //   expect(otp1).toBeLessThanOrEqual(99999);

  //   expect(otp2).toBeGreaterThanOrEqual(10000);
  //   expect(otp2).toBeLessThanOrEqual(99999);
  // });

  // test("mock unpredictable Math Random", () => {
  //   const mathSpy = jest.spyOn(Math, "random");
  //   mathSpy.mockImplementation(() => 0.12345);

  //   const otp = generateOtp();
  //   expect(otp).toBe(21110);

  //   mathSpy.mockRestore();
  // });

  // test("simple spy", () => {
  //   const mathSpy = jest.spyOn(Math, "random");
  //   generateOtp();

  //   expect(mathSpy).toHaveBeenCalledTimes(1);

  //   mathSpy.mockRestore();
  // });

  // test("spy with return value", () => {
  //   const mathSpy = jest.spyOn(Math, "random");
  //   mathSpy.mockReturnValue(0.5);

  //   const otp = generateOtp();

  //   expect(otp).toBe(55000);
  //   expect(mathSpy).toHaveBeenCalledTimes(1);

  //   mathSpy.mockRestore();
  // });

  // test("spy with custom implementation", () => {
  //   const mathSpy = jest.spyOn(Math, "random");

  //   let callNumber = 0;
  //   mathSpy.mockImplementation(() => {
  //     callNumber++;
  //     return callNumber * 0.1;
  //   });

  //   const otp1 = generateOtp();
  //   const otp2 = generateOtp();

  //   expect(otp1).toBe(19000);
  //   expect(otp2).toBe(28000);
  //   expect(mathSpy).toHaveBeenCalledTimes(2);

  //   mathSpy.mockRestore();
  // });

  // test("use jest.spyOn with multiple return values", () => {
  //   const mathSpy = jest.spyOn(Math, "random");

  //   mathSpy.mockReturnValueOnce(0.1).mockReturnValueOnce(0.3);

  //   const otp1 = generateOtp();
  //   const otp2 = generateOtp();

  //   expect(otp1).toBe(19000);
  //   expect(otp2).toBe(28000);
  //   expect(mathSpy).toHaveBeenCalledTimes(2);

  //   mathSpy.mockRestore();
  // });

  // test("jest.fn() for standalone mock function", () => {
  //   const mockCallback = jest.fn();
  //   mockCallback.mockReturnValue("mocked result");

  //   const result = mockCallback("test-argument");

  //   expect(result).toBe("mocked result");
  //   expect(mockCallback).toHaveBeenCalledWith("test-argument");
  //   expect(mockCallback).toHaveBeenCalledTimes(1);
  // });

  test("es module import", () => {
    generateOtp.mockImplementation(() => 12345);

    const otp = generateOtp();
    expect(otp).toBe(12345);
    expect(generateOtp).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
});
