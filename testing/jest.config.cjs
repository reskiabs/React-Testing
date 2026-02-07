module.exports = {
  testEnvironment: "jest-fixed-jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(@faker-js|msw|until-async|@bundled-es-modules|@mswjs|strict-event-emitter|statuses)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.js"],
};
