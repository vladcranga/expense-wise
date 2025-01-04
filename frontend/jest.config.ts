module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
