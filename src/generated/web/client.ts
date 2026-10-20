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
  CreateScenarioRequest,
  CreateTestPlanVariable400Response,
  CreateTestPlanVariable400ResponseErrorsInner,
  CreateTestPlanVariableRequest,
  CreateUrlReplacementRequest,
  DeleteAccessPoint404Response,
  DeleteAccessPoint404ResponseErrorsInner,
  DeleteAccessPointRequest,
  DescribeResult200Response,
  DeviceTypeEnum,
  DuplicateScenario402Response,
  DuplicateScenario402ResponseErrorsInner,
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
  Project,
  ProjectInfo,
  ReplaceScenarioStepsRequest,
  RestoreScenarioHistoryRequest,
  ResultStepArgument,
  ResultStepArgumentTypeEnum,
  ResultStepArgumentValue,
  Scenario,
  ScenarioDetail,
  ScenarioHistory,
  ScenarioHistoryAuthor,
  ScenarioHistoryDetail,
  ScenarioStep,
  ScenarioStepOnFailureEnum,
  ScenarioStepStepExecutionTypeEnum,
  ScenarioStepArgument,
  ScenarioStepArgumentTypeEnum,
  ScenarioStepArgumentOverridesValue,
  ScenarioStepArgumentOverridesValueArgumentsInner,
  ScenarioStepArgumentOverridesValueArgumentsInnerTypeEnum,
  ScenarioStepArgumentOverridesValueArgumentsInnerValue,
  ScenarioStepArgumentValue,
  ScenarioTestCaseResult,
  ScenarioTestCaseResultAllOf,
  ScenarioVariables,
  ScenarioVariablesExportInner,
  ScenarioVariablesImportInner,
  SearchSteps400Response,
  SearchSteps400ResponseErrorsInner,
  StepKeyword,
  StepKeywordArgument,
  StepKeywordArgumentTypeEnum,
  StepSearchHit,
  StepSearchHitExecutedByInner,
  StepSearchHitScenario,
  StepSearchHitStepGroup,
  TestCaseResult,
  TestCaseResultDetail,
  TestCaseResultExportVariablesInner,
  TestCaseResultImportVariablesInner,
  TestCaseResultImportVariablesInnerSetBy,
  TestCaseResultStatus,
  TestCaseResultStep,
  TestCaseResultStepOnFailureEnum,
  TestCaseResultStepStepExecutionTypeEnum,
  TestCaseResultStepStatusEnum,
  TestCaseResultStepMatch,
  TestCaseResultStepMatchLocatedByEnum,
  TestCaseResultStepUrlEventsInner,
  TestCaseResultStepUrlEventsInnerTimingEnum,
  TestPlan,
  TestPlanCapabilityResult,
  TestPlanResult,
  TestPlanResultStatus,
  TestPlanVariable,
  TimezoneEnum,
  UpdateScenario412Response,
  UpdateScenario412ResponseErrorsInner,
  UpdateScenarioRequest,
  UpdateTestPlanVariableRequest,
  UpdateUrlReplacementRequest,
  UrlReplacement,
  UsedCredits,
  User,
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
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

  /**
   * List the projects (workspaces) the access token\'s user is a member of, plus their partner\'s workspaces for a partner admin, ordered by id.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  listProjects(options?: AxiosRequestConfig) {
    return this.projectApi.listProjects(options);
  }

  private readonly resultApi;

  /**
   * Get a test result.
   * @summary Get a test result.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {number} resultId For example, 4 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {boolean} [getDetails] The flag to get details of the test case result.
   * @param {Array<'failed' | 'internal_error' | 'review_needed'>} [statuses] Return only the test case results matching any of these filters, the same ones the result page offers. &#x60;failed&#x60; matches failed and internal-error test cases, &#x60;internal_error&#x60; only internal errors, and &#x60;review_needed&#x60; test cases with element warnings to review. For example &#x60;statuses&#x3D;failed,review_needed&#x60;. Omit to return every test case result.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  describeResult(
    projectId: number,
    resultId: number,
    getDetails?: boolean,
    statuses?: Array<"failed" | "internal_error" | "review_needed">,
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.describeResult(
      projectId,
      resultId,
      getDetails,
      statuses,
      options,
    );
  }

  /**
   * Get the step-by-step breakdown of a single test case result, including the element locators Autify resolved for each step.  A "test case result" is the execution of one scenario on one capability. You can obtain its ID from the `test_plan_capability_results[].test_case_results[].id` field returned by `describeResult`.  Use this to see which step failed and why, and to read back the locators Autify generated for an element, which are usually better than a selector you would write by hand.  To see what the page looked like, fetch a step\'s `screenshot_url`. On a failed step, compare its screenshot with the one from the step before it.  Note: a step reports its keyword as `action_type`, the same enum `listStepKeywords` and `describeScenario` use, rather than as a name. The localized label the UI shows appears only in `describeResult` (`get_details`).  Values typed into a password field are returned as `******`.
   * @summary Get the steps and element locators of a test case result.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {number} testCaseResultId The ID of the test case result. Obtainable from the &#x60;test_case_results[].id&#x60; field of &#x60;describeResult&#x60;.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  describeTestCaseResult(
    projectId: number,
    testCaseResultId: number,
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.describeTestCaseResult(
      projectId,
      testCaseResultId,
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

  /**
   * List the test results of a single scenario, newest first.  Each entry is one execution of that scenario on one capability, so a scenario run against three browsers contributes three entries. Use this to see how one scenario has been doing over time, which `listResults` cannot answer: that endpoint returns whole test plan executions and is filterable only by test plan.  `review_needed` is the number of "Review needed" element warnings raised by that execution. A count that climbs over recent results means the scenario\'s element locators are drifting.
   * @summary List the test results of one scenario.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} [page] The number of page returns.
   * @param {number} [perPage] The number of items returns. Default number is 30 and up to a maximum of 100
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  listScenarioResults(
    projectId: number,
    scenarioId: number,
    page?: number,
    perPage?: number,
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.listScenarioResults(
      projectId,
      scenarioId,
      page,
      perPage,
      options,
    );
  }

  /**
   * Start a new test result that reruns every test case of this result that failed or ended in an internal error, the same rerun the "Rerun failed tests" button starts. Each test case runs with the data table row and the imported variable values it ran with originally, and the new result records this one as the result it reruns. It reruns even if someone edited a failed scenario since, so you can rerun the test cases to check your fix.  Prefer this over `executeScenarios` when you are fixing the failures of a test plan\'s result. The rerun belongs to the test plan and runs with the plan\'s capabilities and settings, so the plan\'s results record its passes. `executeScenarios` starts a result outside the test plan, and the plan\'s latest result stays failed.  To rerun only some of the failed scenarios, use `executeScenarios` instead. That starts a separate result, without the original\'s data table rows or imported values.  Poll the returned `result_id` with `describeResult` to follow the rerun.
   * @summary Rerun the failed test cases of a test result.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {number} resultId For example, 4 for the following URL: https://app.autify.com/projects/1/results/4
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ResultApi
   */
  rerunFailedTestCases(
    projectId: number,
    resultId: number,
    options?: AxiosRequestConfig,
  ) {
    return this.resultApi.rerunFailedTestCases(projectId, resultId, options);
  }

  private readonly scenarioApi;

  /**
   * Create an empty scenario, ready to be given steps.  The scenario is created with no steps. Add them with `replaceScenarioSteps`, sending the `version_token` this call returns.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {CreateScenarioRequest} [createScenarioRequest] The scenario to create
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  createScenario(
    projectId: number,
    createScenarioRequest?: CreateScenarioRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.createScenario(
      projectId,
      createScenarioRequest,
      options,
    );
  }

  /**
   * Delete a scenario and remove it from every test plan that includes it.  This can\'t be undone through the API. Autify support can restore a deleted scenario, but it won\'t rejoin its test plans. Confirm with the user before deleting.  Step groups can\'t be deleted here. A step group\'s id gets 404.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {string} [versionToken] The version of the scenario you are deleting, as returned by &#x60;version_token&#x60; when you read it. If anyone changed the scenario's name, description, labels or steps since then, you get 412 and the scenario stays. Sending an empty value is an error.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  deleteScenario(
    projectId: number,
    scenarioId: number,
    versionToken?: string,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.deleteScenario(
      projectId,
      scenarioId,
      versionToken,
      options,
    );
  }

  /**
   * Get a scenario, with its steps, data table and variables.  Each step names its keyword by the canonical English name that `listStepKeywords` publishes, and lists its arguments in that keyword\'s argument order. An argument that targets an element carries the locators Autify matches it by, rather than a placeholder.  An `Execute Javascript` step lists its function arguments after its keyword\'s arguments, as `text` arguments named the way its code refers to them. A function argument that shares a name with one of the keyword\'s arguments is left out.  An element whose `user_locator_heals` is true treats `user_locator` as a seed: Autify learns the element from it on the next passing run and matches it automatically after that. Its `seed_locator` is the selector Autify last learned from, and equals `user_locator` once that has happened. An element whose `user_locator_heals` is false uses `user_locator` as a pin on every run. `replaceScenarioSteps` sets it.  An `Execute Step Group` step is reported as a reference to its step group rather than expanded in place; read the group itself with this endpoint, using the `step_group_id` from the step\'s argument. The values this call site substitutes into the group come back beside it, in `overrides`.  A step recorded on a password field is masked: values typed into it are returned as `******` and the element\'s `candidate_locators` are withheld, as on `describeTestCaseResult`.
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
   * Get the steps, data table and variables a scenario held at one entry of its history, as listed by `listScenarioHistories`.  They come back in the same shape `describeScenario` returns, so an entry can be compared field by field with the scenario as it is now or with another entry. Password masking applies as it does there. Five things differ, because an entry records values rather than the rows they lived in:  - An element argument\'s `element_id`, `user_locator_heals` and   `seed_locator` are always null, because an entry records none of them.   Its `user_locator` and `candidate_locators` are the ones the element had   at that save. - A step\'s `id` is the id it had at that save, which may no longer exist   in the scenario. It is null on entries saved before late July 2024,   when entries started recording step ids. - An `Execute Step Group` step\'s `overrides` are read against the step   group as it is now, so an override on a step since removed from the   group is not reported. - An export variable set by a step inside a step group resolves its   `step_id` against that group as it is now. When more than one called   group assigns the same identifier, the step with the lowest id wins. - An entry records the scenario\'s name at that save but not its   description or labels, and a later rename does not move it.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} historyId The &#x60;id&#x60; of an entry &#x60;listScenarioHistories&#x60; returned for this scenario.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  describeScenarioHistory(
    projectId: number,
    scenarioId: number,
    historyId: number,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.describeScenarioHistory(
      projectId,
      scenarioId,
      historyId,
      options,
    );
  }

  /**
   * Duplicate a scenario.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  duplicateScenario(
    projectId: number,
    scenarioId: number,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.duplicateScenario(projectId, scenarioId, options);
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
   * List a scenario\'s history, newest first.  Each save of the scenario\'s steps in the scenario editor records the whole scenario as it stood after that save, as one entry, and so does creating it by import, copy or `duplicateScenario`. An editor save\'s entry is written a moment after the save, not with it; the others are written with it. Changing only the name, description or labels, which is all `updateScenario` changes, records no entry.  Use this to see when a scenario\'s steps changed and who changed them, then read an entry with `describeScenarioHistory` to see what it held. Comparing two entries shows what a save changed.  `latest` is true on the entry recorded by the most recent save of the steps, and holds the steps as last saved. The entry listed after it is the version before that save. A passing run, or a locator update made from a test result, changes an element\'s candidate locators without recording an entry, so `describeScenario` can differ from `latest` there.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} [page] The number of page returns.
   * @param {number} [perPage] The number of items returns. Default number is 30 and up to a maximum of 100
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  listScenarioHistories(
    projectId: number,
    scenarioId: number,
    page?: number,
    perPage?: number,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.listScenarioHistories(
      projectId,
      scenarioId,
      page,
      perPage,
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

  /**
   * List every step keyword an Autify NoCode Web scenario can be built from, with the ordered argument signature of each.  Supply a step\'s arguments in the order `arguments` gives them. A keyword whose `included_in_plan` is false is not part of this workspace\'s plan, and writing a step that uses it is rejected; every keyword is listed either way, so the whole vocabulary is visible.  `keyword` is the canonical English name and is what the rest of the API expects, whatever language the workspace is set to.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  listStepKeywords(projectId: number, options?: AxiosRequestConfig) {
    return this.scenarioApi.listStepKeywords(projectId, options);
  }

  /**
   * Replace a scenario\'s steps. Send the whole list in the order the steps should run; one call adds, edits, removes and reorders steps.  A step that carries an `id` from `describeScenario` is that existing step. A step without an `id` is added. An existing step whose `id` is not in the list is removed, so send `[]` to remove every step.  Each step and each of its arguments is a JSON merge patch against what `describeScenario` returned. A field you send that differs from the current value is changed, a field you leave out is kept, and `null` clears it. So `{"id": 12}` keeps step 12 exactly as it is, at its new position, and sending the read back unchanged changes nothing. Arguments are matched by `name`, as `listStepKeywords` names them, so send only the arguments you change. An `Execute Javascript` step\'s function arguments are matched by the names `describeScenario` reports for them. Send a name the step lacks to add a function argument, and `"value": null` to remove one. To rename one, remove the old name and add the new one in the same request.  A new step needs an `action_type` from `listStepKeywords` and that keyword\'s required arguments. Sending a different `action_type` for an existing step rewrites it for the new keyword, keeping its `id` and carrying over the arguments whose names the two keywords share.  When you write a `user_locator`, send `user_locator_heals: true` with it unless the step must use that exact selector on every run. Autify then finds the element by your selector on the next passing run, learns the element from that run and matches it from then on the way it matches a recorded step, so a later page change does not break the step. Your selector only has to pick out the element on the page as it is now. Left false, the selector is a pin, and the step fails once the selector stops matching.  Read the scenario again from the response: it has the new steps\' ids and the `version_token` for your next write.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {ReplaceScenarioStepsRequest} replaceScenarioStepsRequest The scenario's steps, in the order they should run
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  replaceScenarioSteps(
    projectId: number,
    scenarioId: number,
    replaceScenarioStepsRequest: ReplaceScenarioStepsRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.replaceScenarioSteps(
      projectId,
      scenarioId,
      replaceScenarioStepsRequest,
      options,
    );
  }

  /**
   * Restore a scenario to one entry of its history, as listed by `listScenarioHistories`. The scenario is overwritten with what the entry holds: its name, steps, data table, variables, options and resolution. Its description and labels are kept, because an entry does not record them.  Steps come back as they were at that save, recorded steps included:  - A step still in the scenario keeps its `id`. A step removed since comes   back under the `id` it had. A step added since is removed. Entries saved   before late July 2024 record no step ids, so their steps get new ones. - An element comes back with the `candidate_locators` it had at that save,   so whatever Autify learned about it from runs since then is lost. Its   `user_locator_heals` goes back to false and its `seed_locator` is   cleared, because an entry records neither.  Restoring an entry that already matches the scenario changes nothing and returns the same `version_token`. Any other restore records a new entry in `listScenarioHistories`, so it can be undone by restoring the entry listed after it. When the scenario as it stands has no entry yet, because the entry for a recent write is still being saved, the restore records that state first.  Read the scenario from the response: it has the restored steps and the `version_token` for your next write.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} historyId The &#x60;id&#x60; of an entry &#x60;listScenarioHistories&#x60; returned for this scenario.
   * @param {RestoreScenarioHistoryRequest} [restoreScenarioHistoryRequest]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  restoreScenarioHistory(
    projectId: number,
    scenarioId: number,
    historyId: number,
    restoreScenarioHistoryRequest?: RestoreScenarioHistoryRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.restoreScenarioHistory(
      projectId,
      scenarioId,
      historyId,
      restoreScenarioHistoryRequest,
      options,
    );
  }

  /**
   * Find the steps in a project whose arguments contain some text, without reading every scenario.  The search covers every live step of every scenario and step group in the project, ignoring case. It matches the value of a `text` or `url` argument, including an `Execute Javascript` step\'s function arguments, and a value an `Execute Step Group` step substitutes into its group, as `describeScenario` reports it in `overrides`. With `match_on=locators` it matches an element\'s `user_locator` instead; with no `match_on` it matches both. Step names, memos, `seed_locator`, `candidate_locators`, file names, data tables and variables are not searched.  A step recorded on a password field is never matched, by its value or its locator, and neither is a value a call site substitutes into one.  Each result is one step, in the order of its scenario or step group and then of its position there. A match inside a step group lists the scenarios that run the group in `executed_by`, so a change to the group reaches all of them. To change a scenario\'s step, read the scenario with `describeScenario` for its `version_token`, then send the steps with `replaceScenarioSteps`.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios
   * @param {string} q The text to find. It matches anywhere in a value, ignoring case; &#x60;%&#x60; and &#x60;_&#x60; are matched literally.
   * @param {'values' | 'locators'} [matchOn] &#x60;values&#x60; matches argument values only and &#x60;locators&#x60; matches &#x60;user_locator&#x60; only. Leave it out to match both.
   * @param {number} [page] The number of page returns.
   * @param {number} [perPage] The number of items returns. Default number is 30 and up to a maximum of 100
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  searchSteps(
    projectId: number,
    q: string,
    matchOn?: "values" | "locators",
    page?: number,
    perPage?: number,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.searchSteps(
      projectId,
      q,
      matchOn,
      page,
      perPage,
      options,
    );
  }

  /**
   * Update a scenario.
   * @param {number} projectId For example, 1 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {number} scenarioId For example, 2 for the following URL: https://app.autify.com/projects/1/scenarios/2
   * @param {UpdateScenarioRequest} updateScenarioRequest The scenario to update
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ScenarioApi
   */
  updateScenario(
    projectId: number,
    scenarioId: number,
    updateScenarioRequest: UpdateScenarioRequest,
    options?: AxiosRequestConfig,
  ) {
    return this.scenarioApi.updateScenario(
      projectId,
      scenarioId,
      updateScenarioRequest,
      options,
    );
  }

  private readonly scheduleApi;

  /**
   * "Schedule" is the old name for "Test Plan", so `schedule_id` is the test plan\'s ID.
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
