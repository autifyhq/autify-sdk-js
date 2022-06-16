import {
  WebClient,
  MobileClient,
  WEB_BASE_PATH,
  MOBILE_BASE_PATH,
} from "../src/index";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require("../package.json").version;

describe.each([{ clientClass: WebClient }, { clientClass: MobileClient }])(
  "$clientClass.name",
  ({ clientClass }) => {
    test("version", () => {
      const client = new clientClass("token");
      expect(client.version).toBe(version);
    });

    test("empty token", () => {
      expect(() => {
        new clientClass("");
      }).toThrowError();
    });
  }
);

test("WEB_BASE_PATH", () => {
  expect(WEB_BASE_PATH).toBe("https://app.autify.com/api/v1");
});

test("MOBILE_BASE_PATH", () => {
  expect(MOBILE_BASE_PATH).toBe("https://mobile-app.autify.com/api/v1");
});
