import { MobileClient, MOBILE_BASE_PATH } from "../../src";
import axios from "axios";
import MockAdaptor from "axios-mock-adapter";
import { join } from "path";

const mock = new MockAdaptor(axios, { onNoMatch: "throwException" });
const mockResponse = {};
const token = "token";
const userAgent = "userAgent";
const client = new MobileClient(token, { userAgent });
const headersMatcher = expect.objectContaining({
  Authorization: `Bearer ${token}`,
  "User-Agent": userAgent,
});

describe.each([
  {
    desc: "uploadBuild",
    api: () => client.uploadBuild("id", join(__dirname, "mock.file")),
    mockOn: () =>
      mock.onPost(
        MOBILE_BASE_PATH + "/projects/id/builds",
        undefined,
        headersMatcher
      ),
  },
  {
    desc: "runTestPlan",
    api: () => client.runTestPlan("id", {}),
    mockOn: () =>
      mock.onPost(
        MOBILE_BASE_PATH + "/test_plans/id/test_plan_results",
        undefined,
        headersMatcher
      ),
  },
  {
    desc: "describeTestResult",
    api: () => client.describeTestResult("id", "id2"),
    mockOn: () =>
      mock.onGet(
        MOBILE_BASE_PATH + "/projects/id/results/id2",
        undefined,
        headersMatcher
      ),
  },
  {
    desc: "listTestResults",
    api: () => client.listTestResults("id"),
    mockOn: () =>
      mock.onGet(
        MOBILE_BASE_PATH + "/projects/id/results",
        undefined,
        headersMatcher
      ),
  },
])("$desc", ({ api, mockOn }) => {
  test("success", async () => {
    mockOn().reply(200, mockResponse);
    expect((await api()).data).toStrictEqual(mockResponse);
  });

  test("networkError", async () => {
    mockOn().networkError();
    await api().catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  test("timeout", async () => {
    mockOn().timeout();
    await api().catch((error) => {
      expect(error).toBeInstanceOf(Error);
    });
  });
});
