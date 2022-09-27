import { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { createReadStream } from "fs";
import {
  Configuration,
  AccessPoint,
  Capability,
  CapabilityOption,
  CreateAccessPoint400Response,
  CreateAccessPoint400ResponseErrorsInner,
  CreateAccessPointRequest,
  CreateAccessPointResult,
  CreateUrlReplacementRequest,
  DeleteAccessPoint404Response,
  DeleteAccessPoint404ResponseErrorsInner,
  DeleteAccessPointRequest,
  DescribeResult200Response,
  DescribeResult200ResponseStatusEnum,
  DescribeResult200ResponseTestPlan,
  DescribeResult200ResponseTestPlanCapabilityResultsInner,
  ExecuteScenarios401Response,
  ExecuteScenarios401ResponseErrorsInner,
  ExecuteScenarios404Response,
  ExecuteScenarios404ResponseErrorsInner,
  ExecuteScenariosRequest,
  ExecuteScenariosRequestExecutionTypeEnum,
  ExecuteScenariosRequestAutifyConnect,
  ExecuteScenariosRequestCapabilitiesInner,
  ExecuteScenariosRequestScenariosInner,
  ExecuteScenariosResult,
  ExecuteSchedule200Response,
  ExecuteSchedule200ResponseData,
  ExecuteSchedule200ResponseDataAttributes,
  ExecuteSchedule401Response,
  ExecuteSchedule401ResponseErrorsInner,
  ExecuteSchedule404Response,
  ExecuteSchedule404ResponseErrorsInner,
  ExecuteScheduleRequest,
  ExecuteScheduleRequestAutifyConnect,
  Label,
  Scenario,
  TestCaseResult,
  TestCaseResultStatusEnum,
  TestPlan,
  TestPlanCapabilityResult,
  TestPlanCapabilityResultStatusEnum,
  TestPlanResult,
  TestPlanResultStatusEnum,
  UpdateUrlReplacementRequest,
  UrlReplacement,
  AutifyConnectApiAxiosParamCreator,
  AutifyConnectApiFp,
  AutifyConnectApiFactory,
  AutifyConnectApi,
  CapabilityApiAxiosParamCreator,
  CapabilityApiFp,
  CapabilityApiFactory,
  CapabilityApi,
  ResultApiAxiosParamCreator,
  ResultApiFp,
  ResultApiFactory,
  ResultApi,
  ScenarioApiAxiosParamCreator,
  ScenarioApiFp,
  ScenarioApiFactory,
  ScenarioApi,
  ScheduleApiAxiosParamCreator,
  ScheduleApiFp,
  ScheduleApiFactory,
  ScheduleApi,
  UrlReplacementApiAxiosParamCreator,
  UrlReplacementApiFp,
  UrlReplacementApiFactory,
  UrlReplacementApi,
} from "./openapi";

export { BASE_PATH as WEB_BASE_PATH } from "./openapi/base";

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

export class WebClient {
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
    this.autifyConnectApi = new AutifyConnectApi(configuration);
    this.capabilityApi = new CapabilityApi(configuration);
    this.resultApi = new ResultApi(configuration);
    this.scenarioApi = new ScenarioApi(configuration);
    this.scheduleApi = new ScheduleApi(configuration);
    this.urlReplacementApi = new UrlReplacementApi(configuration);
  }

  private readonly autifyConnectApi;

  /**
   * You can generate a new access point by passing in its name.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {CreateAccessPointRequest} createAccessPointRequest The name of the access point to be created
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AutifyConnectApi
   */
  createAccessPoint(
    projectId: number,
    createAccessPointRequest: CreateAccessPointRequest,
    options?: AxiosRequestConfig
  ) {
    return this.autifyConnectApi.createAccessPoint(
      projectId,
      createAccessPointRequest,
      options
    );
  }

  /**
   * You can delete an access point by passing in its name.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {DeleteAccessPointRequest} deleteAccessPointRequest The name of the access point to be deleted
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AutifyConnectApi
   */
  deleteAccessPoint(
    projectId: number,
    deleteAccessPointRequest: DeleteAccessPointRequest,
    options?: AxiosRequestConfig
  ) {
    return this.autifyConnectApi.deleteAccessPoint(
      projectId,
      deleteAccessPointRequest,
      options
    );
  }

  /**
   * List access points for the project.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {number} [page] The number of page returns.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AutifyConnectApi
   */
  listAccessPoints(
    projectId: number,
    page?: number,
    options?: AxiosRequestConfig
  ) {
    return this.autifyConnectApi.listAccessPoints(projectId, page, options);
  }

  private readonly capabilityApi;

  /**
   * List available Capabilities.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/capabilities
   * @param {string} [os] os name to filter
   * @param {string} [browser] browser name to filter
   * @param {string} [deviceType] device_type name to filter
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CapabilityApi
   */
  listCapabilities(
    projectId: number,
    os?: string,
    browser?: string,
    deviceType?: string,
    options?: AxiosRequestConfig
  ) {
    return this.capabilityApi.listCapabilities(
      projectId,
      os,
      browser,
      deviceType,
      options
    );
  }

  private readonly resultApi;

  /**
   * Get a result.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {number} resultId For example, 4 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  describeResult(
    projectId: number,
    resultId: number,
    options?: AxiosRequestConfig
  ) {
    return this.resultApi.describeResult(projectId, resultId, options);
  }

  /**
   * List results.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results
   * @param {number} [page] The number of page returns.
   * @param {number} [perPage] The number of items returns. Default number is 30 and up to a maximum of 100
   * @param {number} [testPlanId] Test plan ID used to filter results.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  listResults(
    projectId: number,
    page?: number,
    perPage?: number,
    testPlanId?: number,
    options?: AxiosRequestConfig
  ) {
    return this.resultApi.listResults(
      projectId,
      page,
      perPage,
      testPlanId,
      options
    );
  }

  private readonly scenarioApi;

  /**
   * Get a scenario.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  describeScenario(
    projectId: number,
    scenarioId: number,
    options?: AxiosRequestConfig
  ) {
    return this.scenarioApi.describeScenario(projectId, scenarioId, options);
  }

  /**
   * You can execute any scenarios in your workspace using any execution environments (which is called \"capabilities\" here).
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {ExecuteScenariosRequest} executeScenariosRequest The scenarios and settings to execute
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  executeScenarios(
    projectId: number,
    executeScenariosRequest: ExecuteScenariosRequest,
    options?: AxiosRequestConfig
  ) {
    return this.scenarioApi.executeScenarios(
      projectId,
      executeScenariosRequest,
      options
    );
  }

  /**
   * List scenarios.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {number} [page] The number of page returns.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  listScenarios(
    projectId: number,
    page?: number,
    options?: AxiosRequestConfig
  ) {
    return this.scenarioApi.listScenarios(projectId, page, options);
  }

  private readonly scheduleApi;

  /**
   * Run a test plan. (Note: \"Schedule\" is called as \"TestPlan\" now.)
   * @param {number} scheduleId For example, 3 for the following URL: https://app.autify.com/projects/1/test_plans/3
   * @param {ExecuteScheduleRequest} [executeScheduleRequest] The options to execute a test plan.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScheduleApi
   */
  executeSchedule(
    scheduleId: number,
    executeScheduleRequest?: ExecuteScheduleRequest,
    options?: AxiosRequestConfig
  ) {
    return this.scheduleApi.executeSchedule(
      scheduleId,
      executeScheduleRequest,
      options
    );
  }

  private readonly urlReplacementApi;

  /**
   * Create a new url replacement for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {CreateUrlReplacementRequest} createUrlReplacementRequest The url to replace
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UrlReplacementApi
   */
  createUrlReplacement(
    testPlanId: number,
    createUrlReplacementRequest: CreateUrlReplacementRequest,
    options?: AxiosRequestConfig
  ) {
    return this.urlReplacementApi.createUrlReplacement(
      testPlanId,
      createUrlReplacementRequest,
      options
    );
  }

  /**
   * Delete a url replacement for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {number} urlReplacementId url_replacement id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UrlReplacementApi
   */
  deleteUrlReplacement(
    testPlanId: number,
    urlReplacementId: number,
    options?: AxiosRequestConfig
  ) {
    return this.urlReplacementApi.deleteUrlReplacement(
      testPlanId,
      urlReplacementId,
      options
    );
  }

  /**
   * List url replacements for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UrlReplacementApi
   */
  listUrlReplacements(testPlanId: number, options?: AxiosRequestConfig) {
    return this.urlReplacementApi.listUrlReplacements(testPlanId, options);
  }

  /**
   * Update a url replacement for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {number} urlReplacementId url_replacement id
   * @param {UpdateUrlReplacementRequest} updateUrlReplacementRequest The url to replace. Either pattern_url or replacement_url is required.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UrlReplacementApi
   */
  updateUrlReplacement(
    testPlanId: number,
    urlReplacementId: number,
    updateUrlReplacementRequest: UpdateUrlReplacementRequest,
    options?: AxiosRequestConfig
  ) {
    return this.urlReplacementApi.updateUrlReplacement(
      testPlanId,
      urlReplacementId,
      updateUrlReplacementRequest,
      options
    );
  }
}
