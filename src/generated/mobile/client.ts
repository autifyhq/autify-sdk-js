import { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { readFileSync } from "fs";
import {
  Configuration,
  RunTestPlan201Response,
  RunTestPlan201ResponseTestPlan,
  RunTestPlan201ResponseTestPlanBuild,
  RunTestPlan201ResponseTestPlanExecuteEnvironmentsInner,
  RunTestPlanRequest,
  UploadBuild201Response,
  UploadBuild400Response,
  UploadBuild400ResponseErrorsInner,
  BuildsApiAxiosParamCreator,
  BuildsApiFp,
  BuildsApiFactory,
  BuildsApi,
  TestPlansApiAxiosParamCreator,
  TestPlansApiFp,
  TestPlansApiFactory,
  TestPlansApi,
} from "./openapi";

export { BASE_PATH as MOBILE_BASE_PATH } from "./openapi/base";

class CustomFormData extends FormData {
  append(key: string, filename: any) {
    const blob = readFileSync(filename);
    super.append(key, blob, { filename });
  }
}

type Options = Readonly<{
  basePath?: string;
  userAgent?: string;
}>;

export class MobileClient {
  readonly version: string;

  constructor(accessToken: string, { basePath, userAgent }: Options = {}) {
    if (!accessToken) {
      throw new Error("accessToken is required.");
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.version = require("../../../package.json").version;
    const baseOptions = {
      ...(userAgent && {
        headers: {
          "User-Agent": userAgent,
        },
      }),
    };
    const configuration = new Configuration({
      accessToken,
      basePath,
      formDataCtor: CustomFormData,
      baseOptions,
    });
    this.buildsApi = new BuildsApi(configuration);
    this.testPlansApi = new TestPlansApi(configuration);
  }

  private readonly buildsApi;

  /**
   * Upload the build file.
   * @summary Upload a build
   * @param {string} projectId The ID of the project to upload the build file to.
   * @param {any} file Build file.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BuildsApi
   */
  uploadBuild(projectId: string, file: any, options?: AxiosRequestConfig) {
    return this.buildsApi.uploadBuild(projectId, file, options);
  }

  private readonly testPlansApi;

  /**
   * Run a test plan
   * @summary Run a test plan
   * @param {string} testPlanId The ID of the test plan to run.
   * @param {RunTestPlanRequest} runTestPlanRequest The build_id to execute the test plan.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestPlansApi
   */
  runTestPlan(
    testPlanId: string,
    runTestPlanRequest: RunTestPlanRequest,
    options?: AxiosRequestConfig
  ) {
    return this.testPlansApi.runTestPlan(
      testPlanId,
      runTestPlanRequest,
      options
    );
  }
}
