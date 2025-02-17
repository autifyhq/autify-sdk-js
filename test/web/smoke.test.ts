import { WebClient, WEB_BASE_PATH } from "../../src";
import axios from "axios";
import MockAdaptor from "axios-mock-adapter";

const mock = new MockAdaptor(axios, { onNoMatch: "throwException" });
const mockResponse = {};
const token = "token";
const userAgent = "userAgent";
const client = new WebClient(token, { userAgent });
const headersMatcher = {
  headers: expect.objectContaining({
    Authorization: `Bearer ${token}`,
    "User-Agent": userAgent,
  }),
};

describe.each([
  {
    desc: "createAccessPoint",
    api: () => client.createAccessPoint(1, { name: "foo" }),
    mockOn: () =>
      mock.onPost(
        WEB_BASE_PATH + "/projects/1/autify_connect/access_points",
        undefined,
        headersMatcher,
      ),
  },
  {
    desc: "deleteAccessPoint",
    api: () => client.deleteAccessPoint(1, { name: "foo" }),
    mockOn: () =>
      mock.onDelete(
        WEB_BASE_PATH + "/projects/1/autify_connect/access_points",
        headersMatcher,
      ),
  },
  {
    desc: "listAccessPoint",
    api: () => client.listAccessPoints(1),
    mockOn: () =>
      mock.onGet(
        WEB_BASE_PATH + "/projects/1/autify_connect/access_points",
        headersMatcher,
      ),
  },
  {
    desc: "listCapabilities",
    api: () => client.listCapabilities(1),
    mockOn: () =>
      mock.onGet(WEB_BASE_PATH + "/projects/1/capabilities", headersMatcher),
  },
  {
    desc: "describeResult",
    api: () => client.describeResult(1, 2),
    mockOn: () =>
      mock.onGet(WEB_BASE_PATH + "/projects/1/results/2", headersMatcher),
  },
  {
    desc: "listResults",
    api: () => client.listResults(1),
    mockOn: () =>
      mock.onGet(WEB_BASE_PATH + "/projects/1/results", headersMatcher),
  },
  {
    desc: "describeScenario",
    api: () => client.describeScenario(1, 2),
    mockOn: () =>
      mock.onGet(WEB_BASE_PATH + "/projects/1/scenarios/2", headersMatcher),
  },
  {
    desc: "executeScenarios",
    api: () =>
      client.executeScenarios(1, {
        capabilities: [],
        scenarios: [],
      }),
    mockOn: () =>
      mock.onPost(
        WEB_BASE_PATH + "/projects/1/execute_scenarios",
        undefined,
        headersMatcher,
      ),
  },
  {
    desc: "listScenarios",
    api: () => client.listScenarios(1),
    mockOn: () =>
      mock.onGet(WEB_BASE_PATH + "/projects/1/scenarios", headersMatcher),
  },
  {
    desc: "executeSchedule",
    api: () => client.executeSchedule(1),
    mockOn: () =>
      mock.onPost(WEB_BASE_PATH + "/schedules/1", undefined, headersMatcher),
  },
  {
    desc: "createUrlReplacement",
    api: () =>
      client.createUrlReplacement(1, {
        pattern_url: "",
        replacement_url: "",
      }),
    mockOn: () =>
      mock.onPost(
        WEB_BASE_PATH + "/test_plans/1/url_replacements",
        undefined,
        headersMatcher,
      ),
  },
  {
    desc: "deleteUrlReplacement",
    api: () => client.deleteUrlReplacement(1, 2),
    mockOn: () =>
      mock.onDelete(
        WEB_BASE_PATH + "/test_plans/1/url_replacements/2",
        headersMatcher,
      ),
  },
  {
    desc: "listUrlReplacements",
    api: () => client.listUrlReplacements(1),
    mockOn: () =>
      mock.onGet(
        WEB_BASE_PATH + "/test_plans/1/url_replacements",
        headersMatcher,
      ),
  },
  {
    desc: "updateUrlReplacement",
    api: () => client.updateUrlReplacement(1, 2, {}),
    mockOn: () =>
      mock.onPut(
        WEB_BASE_PATH + "/test_plans/1/url_replacements/2",
        undefined,
        headersMatcher,
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
