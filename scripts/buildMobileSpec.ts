/**
 * Builds swagger-mobile.yml from mobile-web's published spec. Generated output —
 * edit this script or swagger-mobile-overlay.yml, not the result.
 *
 *   ts-node scripts/buildMobileSpec.ts [--source <path-or-url>] [--out <file>]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { parse, stringify } from "yaml";
// @ts-expect-error swagger2openapi ships no type declarations.
import { convertObj } from "swagger2openapi";

const DEFAULT_SOURCE = "https://mobile-app.autify.com/api/docs/v1/swagger.yaml";
const SERVER_URL = "https://mobile-app.autify.com/api/v1";
const PATH_PREFIX = "/api/v1";
const OVERLAY_PATH = "swagger-mobile-overlay.yml";
const SECURITY_SCHEME = "bearerAuth";

// operationId is the MCP tool name upstream and the SDK method name here, so
// neither side can rename it; remap instead.
const OPERATION_ID_RENAMES: Record<string, string> = {
  getTestResult: "describeTestResult",
};

const HTTP_METHODS = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>;

const isPlainObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Arrays replace rather than concatenate.
const merge = (base: unknown, patch: unknown): unknown => {
  if (!isPlainObject(base) || !isPlainObject(patch)) return patch;
  const out: Json = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    out[key] = key in base ? merge(base[key], value) : value;
  }
  return out;
};

// The overlay exists to add what mobile-web does not document, so everything
// below a response or requestBody is additive by design. The anchors it hangs
// those additions on are not: a path, method, response code or requestBody the
// overlay names must already exist in the source. When upstream renames or
// removes one, merge() inserts the overlay's half as a phantom instead of
// failing -- openapi-generator then rejects the phantom with an error that
// describes the injected fragment and never names this file, sending whoever
// hits it off to read the upstream spec. Worse, the additions that are valid
// OpenAPI on their own (a property grafted onto a schema) generate cleanly, and
// the SDK advertises a field the API no longer takes.
const assertOverlayAnchors = (spec: Json, overlay: Json) => {
  const stale: string[] = [];
  const present = (value: unknown, where: string) => {
    if (value === undefined) stale.push(where);
    return value !== undefined;
  };

  for (const [path, item] of Object.entries(overlay.paths ?? {})) {
    const baseItem: Json | undefined = spec.paths?.[path];
    if (!present(baseItem, `paths.${path}`) || !isPlainObject(item)) continue;

    for (const [key, operation] of Object.entries(item)) {
      // Every key here patches an existing one -- a method the source dropped,
      // or a typo like `pst`, is stale either way.
      const baseOperation: Json | undefined = baseItem?.[key];
      if (!present(baseOperation, `paths.${path}.${key}`)) continue;
      if (!HTTP_METHODS.has(key) || !isPlainObject(operation)) continue;

      if (operation.requestBody)
        present(baseOperation?.requestBody, `paths.${path}.${key}.requestBody`);
      for (const code of Object.keys(operation.responses ?? {}))
        present(
          baseOperation?.responses?.[code],
          `paths.${path}.${key}.responses.${code}`,
        );
    }
  }

  if (stale.length > 0)
    throw new Error(
      `${OVERLAY_PATH} patches ${stale.length} thing(s) the source no longer ` +
        `declares:\n  ${stale.join("\n  ")}\n` +
        `Upstream renamed or removed them. Delete the entry if mobile-web now ` +
        `documents it, or repoint it -- merging as-is grafts a phantom onto ` +
        `the generated spec.`,
    );
};

const readSource = async (source: string): Promise<string> => {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`fetching ${source} failed: ${response.status}`);
    }
    return response.text();
  }
  return readFileSync(source, "utf8");
};

// swagger2openapi's warnOnly writes x-s2o-warning into the offending object
// instead of throwing, so a spec it cannot convert would otherwise exit 0 with a
// silently degraded result — a dropped body or parameter that reads downstream
// as a legitimate upstream removal.
const collectConversionWarnings = (node: unknown, path: string): string[] => {
  if (Array.isArray(node))
    return node.flatMap((item, index) =>
      collectConversionWarnings(item, `${path}[${index}]`),
    );
  if (!isPlainObject(node)) return [];
  return Object.entries(node).flatMap(([key, value]) =>
    key === "x-s2o-warning"
      ? [`${path}: ${String(value)}`]
      : collectConversionWarnings(value, `${path}.${key}`),
  );
};

const toOpenApi3 = async (spec: Json): Promise<Json> => {
  if (spec.openapi) return spec;
  if (!spec.swagger)
    throw new Error("source is neither Swagger 2.0 nor OpenAPI 3");
  const { openapi } = await convertObj(spec, { patch: true, warnOnly: true });
  const warnings = collectConversionWarnings(openapi, "$");
  if (warnings.length > 0) {
    throw new Error(
      `swagger2openapi could not convert the source cleanly:\n  ${warnings.join("\n  ")}`,
    );
  }
  return openapi as Json;
};

const normalize = (spec: Json): Json => {
  spec.info = { ...spec.info, title: "Autify for Mobile API" };
  spec.servers = [{ url: SERVER_URL, description: "Production server" }];

  spec.paths = Object.fromEntries(
    Object.entries(spec.paths ?? {}).map(([path, item]) => [
      path.startsWith(PATH_PREFIX)
        ? path.slice(PATH_PREFIX.length) || "/"
        : path,
      item,
    ]),
  );

  // rswag declares bearer auth as an apiKey header.
  const sourceSchemes = new Set(
    Object.keys(spec.components?.securitySchemes ?? {}),
  );
  spec.components = {
    ...spec.components,
    securitySchemes: { [SECURITY_SCHEME]: { type: "http", scheme: "bearer" } },
  };

  // Every scheme the source declared collapses onto bearerAuth. A requirement
  // naming anything else would survive as a dangling reference: the generator
  // emits no auth wiring for it and the client sends unauthenticated requests,
  // which a type diff cannot show.
  const remapSecurity = (requirements: unknown, where: string): Json[] => {
    if (!Array.isArray(requirements))
      throw new Error(`${where}: security must be an array`);
    return requirements.map((requirement) => {
      const names = isPlainObject(requirement) ? Object.keys(requirement) : [];
      const unknown = names.filter((name) => !sourceSchemes.has(name));
      if (unknown.length > 0)
        throw new Error(
          `${where}: unrecognised security scheme(s) ${unknown.join(", ")} — ` +
            `only ${[...sourceSchemes].join(", ")} are declared in the source`,
        );
      // An empty requirement means "auth optional here"; keep it as-is.
      return names.length === 0 ? {} : { [SECURITY_SCHEME]: [] };
    });
  };

  if (spec.security) spec.security = remapSecurity(spec.security, "security");

  const sourceOperationIds = new Set<string>();
  for (const [path, item] of Object.entries(spec.paths) as [string, Json][]) {
    for (const [method, operation] of Object.entries(item)) {
      if (!HTTP_METHODS.has(method) || !isPlainObject(operation)) continue;
      if (operation.security)
        operation.security = remapSecurity(
          operation.security,
          `${method.toUpperCase()} ${path}`,
        );
      sourceOperationIds.add(operation.operationId);
      const renamed = OPERATION_ID_RENAMES[operation.operationId];
      if (renamed) operation.operationId = renamed;
    }
  }

  // A rename that stops matching would silently change the SDK's public method
  // name — autify-cli calls describeTestResult and types against it.
  const stale = Object.keys(OPERATION_ID_RENAMES).filter(
    (id) => !sourceOperationIds.has(id),
  );
  if (stale.length > 0)
    throw new Error(
      `OPERATION_ID_RENAMES maps operationId(s) the source no longer declares: ` +
        `${stale.join(", ")}. Upstream renamed them; update the map deliberately ` +
        `— the SDK method name is public API.`,
    );

  return spec;
};

const main = async () => {
  const args = process.argv.slice(2);
  const valueOf = (flag: string) => {
    const index = args.indexOf(flag);
    if (index === -1) return undefined;
    const value = args[index + 1];
    if (value === undefined || value.startsWith("--"))
      throw new Error(`${flag} needs a value`);
    return value;
  };

  const source =
    valueOf("--source") ?? process.env.MOBILE_SWAGGER_SOURCE ?? DEFAULT_SOURCE;
  const out = valueOf("--out") ?? "swagger-mobile.yml";

  const spec = normalize(await toOpenApi3(parse(await readSource(source))));
  const overlay = parse(readFileSync(OVERLAY_PATH, "utf8")) ?? {};
  assertOverlayAnchors(spec, overlay);
  const merged = merge(spec, overlay) as Json;

  // The overlay reuses one error-body object across three responses; without
  // this the YAML round-trips as &a1/*a1 anchors, which are unreadable in a diff
  // and churn all three sites whenever a path reorder moves the anchor.
  writeFileSync(
    out,
    stringify(merged, { lineWidth: 0, aliasDuplicateObjects: false }),
  );
  console.log(`Wrote ${out} from ${source}.`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
