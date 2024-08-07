import { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { createReadStream } from "fs";
import {
  Configuration,
  AccessPoint,
  BrowserTypeEnum,
  Capability,
  CapabilityOption,
  CreateAccessPoint400Response,
  CreateAccessPoint400ResponseErrorsInner,
  CreateAccessPointRequest,
  CreateAccessPointResult,
  CreateTestPlanVariable400Response,
  CreateTestPlanVariable400ResponseErrorsInner,
  CreateTestPlanVariableRequest,
  CreateUrlReplacementRequest,
  DeleteAccessPoint404Response,
  DeleteAccessPoint404ResponseErrorsInner,
  DeleteAccessPointRequest,
  DescribeResult200Response,
  DeviceTypeEnum,
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
  OsTypeEnum,
  ProjectInfo,
  Scenario,
  TestCaseResult,
  TestCaseResultExportVariablesInner,
  TestCaseResultImportVariablesInner,
  TestCaseResultImportVariablesInnerSetBy,
  TestCaseResultStatus,
  TestPlan,
  TestPlanCapabilityResult,
  TestPlanResult,
  TestPlanResultStatus,
  TestPlanVariable,
  UpdateTestPlanVariableRequest,
  UpdateUrlReplacementRequest,
  UrlReplacement,
  UsedCredits,
  AutifyConnectApiAxiosParamCreator,
  AutifyConnectApiFp,
  AutifyConnectApiFactory,
  AutifyConnectApi,
  CapabilityApiAxiosParamCreator,
  CapabilityApiFp,
  CapabilityApiFactory,
  CapabilityApi,
  CreditApiAxiosParamCreator,
  CreditApiFp,
  CreditApiFactory,
  CreditApi,
  ProjectApiAxiosParamCreator,
  ProjectApiFp,
  ProjectApiFactory,
  ProjectApi,
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
  TestPlanVariableApiAxiosParamCreator,
  TestPlanVariableApiFp,
  TestPlanVariableApiFactory,
  TestPlanVariableApi,
  UrlReplacementApiAxiosParamCreator,
  UrlReplacementApiFp,
  UrlReplacementApiFactory,
  UrlReplacementApi,
} from "./openapi";

export { BASE_PATH as WEB_BASE_PATH } from "./openapi/base";

class CustomFormData extends FormData {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
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
    this.creditApi = new CreditApi(configuration);
    this.projectApi = new ProjectApi(configuration);
    this.resultApi = new ResultApi(configuration);
    this.scenarioApi = new ScenarioApi(configuration);
    this.scheduleApi = new ScheduleApi(configuration);
    this.testPlanVariableApi = new TestPlanVariableApi(configuration);
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
    options?: AxiosRequestConfig,
  ) {
    return this.autifyConnectApi.createAccessPoint(
      projectId,
      createAccessPointRequest,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.autifyConnectApi.deleteAccessPoint(
      projectId,
      deleteAccessPointRequest,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.autifyConnectApi.listAccessPoints(projectId, page, options);
  }

  private readonly capabilityApi;

  /**
   * List available Capabilities.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/capabilities
   * @param {string} [os] os name to filter (deprecated)
   * @param {OsTypeEnum} [osType] Type of the os to filter
   * @param {string} [browser] browser name to filter (deprecated)
   * @param {BrowserTypeEnum} [browserType] Type of the browser to filter
   * @param {DeviceTypeEnum} [deviceType] device_type name to filter (mobile is deprecated)
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CapabilityApi
   */
  listCapabilities(
    projectId: number,
    os?: string,
    osType?: OsTypeEnum,
    browser?: string,
    browserType?: BrowserTypeEnum,
    deviceType?: DeviceTypeEnum,
    options?: AxiosRequestConfig,
  ) {
    return this.capabilityApi.listCapabilities(
      projectId,
      os,
      osType,
      browser,
      browserType,
      deviceType,
      options,
    );
  }

  private readonly creditApi;

  /**
   * Get the number of credits used in the project  Notes: This endpoint works only for organizations on credit-based plans. It always returns 0 for `credits_consumed` and `credit_consumption_event_count` if your organization is on a run-based plan.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/credits
   * @param {string} [dateFrom] The date to start counting used credits from. If not specified, the date will be set to 1 week ago. Up to 90 days in advance can be specified. If the specified date is more than 90 days in the past, the date will be set to 90 days ago. Date must follow the format YYYY-MM-DD (example: "2023-09-21").
   * @param {string} [dateTo] The date to end counting used credits from. If not specified, the date will be set to today. Date must follow the format YYYY-MM-DD (example: "2023-09-28").
   * @param {number} [scenarioId] The scenario ID to filter used credits by.
   * @param {number} [testPlanId] The test plan ID to filter used credits by.
   * @param {number} [userId] The user ID that executed tests to filter used credits by.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CreditApi
   */
  getCreditUsage(
    projectId: number,
    dateFrom?: string,
    dateTo?: string,
    scenarioId?: number,
    testPlanId?: number,
    userId?: number,
    options?: AxiosRequestConfig,
  ) {
    return this.creditApi.getCreditUsage(
      projectId,
      dateFrom,
      dateTo,
      scenarioId,
      testPlanId,
      userId,
      options,
    );
  }

  private readonly projectApi;

  /**
   * Get project information.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/project_info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  getProjectInfo(projectId: number, options?: AxiosRequestConfig) {
    return this.projectApi.getProjectInfo(projectId, options);
  }

  private readonly resultApi;

  /**
   * Get a test result.
   * @summary Get a test result.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {number} resultId For example, 4 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {boolean} [getDetails] The flag to get details of the test case result.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  describeResult(
    projectId: number,
    resultId: number,
    getDetails?: boolean,
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.describeResult(
      projectId,
      resultId,
      getDetails,
      options,
    );
  }

  /**
   * List test results.
   * @summary List test results.
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
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.listResults(
      projectId,
      page,
      perPage,
      testPlanId,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.describeScenario(projectId, scenarioId, options);
  }

  /**
   * You can execute any scenarios in your workspace using any execution environments (which is called "capabilities" here).
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {ExecuteScenariosRequest} executeScenariosRequest The scenarios and settings to execute
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  executeScenarios(
    projectId: number,
    executeScenariosRequest: ExecuteScenariosRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.executeScenarios(
      projectId,
      executeScenariosRequest,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.listScenarios(projectId, page, options);
  }

  private readonly scheduleApi;

  /**
   * "Schedule" is called as "Test Plan" now. If you want to run a test plan, use this endpoint.
   * @summary Run a test plan.
   * @param {number} scheduleId For example, 3 for the following URL: https://app.autify.com/projects/1/test_plans/3
   * @param {ExecuteScheduleRequest} [executeScheduleRequest] The options to execute a test plan.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScheduleApi
   */
  executeSchedule(
    scheduleId: number,
    executeScheduleRequest?: ExecuteScheduleRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scheduleApi.executeSchedule(
      scheduleId,
      executeScheduleRequest,
      options,
    );
  }

  private readonly testPlanVariableApi;

  /**
   * Create a new variable for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {CreateTestPlanVariableRequest} createTestPlanVariableRequest The new variable key and default value to use in the test plan
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestPlanVariableApi
   */
  createTestPlanVariable(
    testPlanId: number,
    createTestPlanVariableRequest: CreateTestPlanVariableRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.testPlanVariableApi.createTestPlanVariable(
      testPlanId,
      createTestPlanVariableRequest,
      options,
    );
  }

  /**
   * Delete an existing test plan variable for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15/
   * @param {number} testPlanVariableId test_plan_variable id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestPlanVariableApi
   */
  deleteTestPlanVariable(
    testPlanId: number,
    testPlanVariableId: number,
    options?: AxiosRequestConfig,
  ) {
    return this.testPlanVariableApi.deleteTestPlanVariable(
      testPlanId,
      testPlanVariableId,
      options,
    );
  }

  /**
   * List the test plan\'s variables
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestPlanVariableApi
   */
  listTestPlanVariable(testPlanId: number, options?: AxiosRequestConfig) {
    return this.testPlanVariableApi.listTestPlanVariable(testPlanId, options);
  }

  /**
   * Update a url replacement for the test plan
   * @param {number} testPlanId For example, 15 for the following URL: https://app.autify.com/projects/1/test_plans/15
   * @param {number} testPlanVariableId test_plan_variable id
   * @param {UpdateTestPlanVariableRequest} updateTestPlanVariableRequest The variable's new key and/or default_value's value to register
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TestPlanVariableApi
   */
  updateTestPlanVariable(
    testPlanId: number,
    testPlanVariableId: number,
    updateTestPlanVariableRequest: UpdateTestPlanVariableRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.testPlanVariableApi.updateTestPlanVariable(
      testPlanId,
      testPlanVariableId,
      updateTestPlanVariableRequest,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.urlReplacementApi.createUrlReplacement(
      testPlanId,
      createUrlReplacementRequest,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.urlReplacementApi.deleteUrlReplacement(
      testPlanId,
      urlReplacementId,
      options,
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
    options?: AxiosRequestConfig,
  ) {
    return this.urlReplacementApi.updateUrlReplacement(
      testPlanId,
      urlReplacementId,
      updateUrlReplacementRequest,
      options,
    );
  }
}
