import { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { createReadStream } from "fs";
import {
  Configuration,
  DescribeTestResult200Response,
  DescribeTestResult200ResponseTestCaseResultsInner,
  DescribeTestResult200ResponseTestCaseResultsInnerTestCase,
  DescribeTestResult200ResponseTestCaseResultsInnerTestCaseBuild,
  DescribeTestResult200ResponseTestCaseResultsInnerTestCaseCapability,
  DescribeTestResult200ResponseTestCaseResultsInnerTestCaseEnvironmentVariablesInner,
  ListTestResults200Response,
  ListTestResults200ResponseDataInner,
  ListTestResults200ResponseDataInnerTestPlan,
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
  TestResultsApiAxiosParamCreator,
  TestResultsApiFp,
  TestResultsApiFactory,
  TestResultsApi,
} from "./openapi";

export { BASE_PATH as MOBILE_BASE_PATH } from "./openapi/base";

class CustomFormData extends FormData {
  append(key: string, filename: any) {
    const stream = createReadStream(filename);
    super.append(key, stream, { filename });
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
      maxBodyLength: Number.POSITIVE_INFINITY,
      maxContentLength: Number.POSITIVE_INFINITY,
    };
    const configuration = new Configuration({
      accessToken,
      basePath,
      formDataCtor: CustomFormData,
      baseOptions,
    });
    this.buildsApi = new BuildsApi(configuration);
    this.testPlansApi = new TestPlansApi(configuration);
    this.testResultsApi = new TestResultsApi(configuration);
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

  private readonly testResultsApi;

  /**
   * Get a test result.
   * @summary Get a test result
   * @param {string} projectId ID of the project from which the test results will be obtained.
   * @param {string} id Test Result ID.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestResultsApi
   */
  describeTestResult(
    projectId: string,
    id: string,
    options?: AxiosRequestConfig
  ) {
    return this.testResultsApi.describeTestResult(projectId, id, options);
  }

  /**
   * List test results.
   * @summary List test results
   * @param {string} projectId ID of the project from which the list of test results will be retrieved.
   * @param {number} [page] Page number to be retrieved.
   * @param {number} [perPage] Number of test results per page.
   * @param {string} [testPlanId] ID of the test plan.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestResultsApi
   */
  listTestResults(
    projectId: string,
    page?: number,
    perPage?: number,
    testPlanId?: string,
    options?: AxiosRequestConfig
  ) {
    return this.testResultsApi.listTestResults(
      projectId,
      page,
      perPage,
      testPlanId,
      options
    );
  }
}
