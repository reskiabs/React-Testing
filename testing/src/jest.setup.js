import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// turn on server before test start
beforeAll(() => server.listen());

// reset every test
afterEach(() => server.resetHandlers());

// turn of when test finished
afterAll(() => server.close());
