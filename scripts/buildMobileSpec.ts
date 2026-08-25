/**
 * Builds swagger-mobile.yml from mobile-web's published API spec.
 *
 * swagger-mobile.yml used to be hand-maintained, which is why it drifted: the
 * SDK sat a year behind the API without anything noticing. This makes it
 * generated output — never edit it directly, edit this script or the overlay.
 *
 * The web client already works this way (`update-swagger-web` curls the
 * published spec). Mobile needs more than a download for two reasons:
 *
 *   1. mobile-web emits Swagger 2.0, because spec/swagger_helper.rb pins it to
 *      work around an rswag 2.3 file-upload bug. rswag is on 2.16 now, so that
 *      workaround is stale — when mobile-web flips to OpenAPI 3 output the
 *      conversion below becomes a no-op and can be deleted.
 *   2. mobile-web's spec under-describes its own API. A converter cannot invent
 *      what upstream never documented, so swagger-mobile-overlay.yml re-adds it.
 *      Every entry there is a standing TODO: fix it in mobile-web's rswag spec,
 *      then delete the entry. When the overlay is empty, this file can shrink to
 *      the same plain curl the web client uses.
 *
 * Usage:
 *   ts-node scripts/buildMobileSpec.ts --source <path-or-url> [--out swagger-mobile.yml]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { parse, stringify } from "yaml";
// @ts-expect-error swagger2openapi ships no type declarations.
import { convertObj } from "swagger2openapi";

const SERVER_URL = "https://mobile-app.autify.com/api/v1";
const PATH_PREFIX = "/api/v1";
const OVERLAY_PATH = "swagger-mobile-overlay.yml";

/**
 * operationId becomes both the SDK method name and mobile-web's MCP tool name,
 * so neither side can rename it unilaterally: upstream would rename a published
 * MCP tool, and adopting upstream would rename a published SDK method that
 * autify-cli calls. Renaming here costs nothing and keeps the mobile client
 * reading like the web one, which uses describeResult / describeScenario.
 */
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

// The spec is arbitrary JSON; narrowing it here would fight the merge below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>;

const isPlainObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Deep merge used to lay the overlay over the converted spec. Arrays replace. */
const merge = (base: unknown, patch: unknown): unknown => {
  if (!isPlainObject(base) || !isPlainObject(patch)) return patch;
  const out: Json = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    out[key] = key in base ? merge(base[key], value) : value;
  }
  return out;
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

/** Swagger 2.0 in, OpenAPI 3 out. Already-3.x input passes straight through. */
const toOpenApi3 = async (spec: Json): Promise<Json> => {
  if (spec.openapi) return spec;
  if (!spec.swagger)
    throw new Error("source is neither Swagger 2.0 nor OpenAPI 3");
  const { openapi } = await convertObj(spec, { patch: true, warnOnly: true });
  return openapi as Json;
};

const normalize = (spec: Json): Json => {
  // rswag writes `host: local.autify.com:9292` from swagger_helper.rb, which the
  // converter turns into a dev-machine servers entry. Always state the real one.
  spec.info = { ...spec.info, title: "Autify for Mobile API" };
  spec.servers = [{ url: SERVER_URL, description: "Production server" }];

  // The prefix lives in the server URL, so paths must not repeat it.
  spec.paths = Object.fromEntries(
    Object.entries(spec.paths ?? {}).map(([path, item]) => [
      path.startsWith(PATH_PREFIX)
        ? path.slice(PATH_PREFIX.length) || "/"
        : path,
      item,
    ]),
  );

  // rswag declares bearer auth as an apiKey header. Left alone, the generator
  // emits setApiKeyToObject instead of setBearerAuthToObject.
  spec.components = {
    ...spec.components,
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer" } },
  };

  for (const item of Object.values(spec.paths) as Json[]) {
    for (const [method, operation] of Object.entries(item)) {
      if (!HTTP_METHODS.has(method) || !isPlainObject(operation)) continue;
      if (operation.security) {
        operation.security = operation.security.map(() => ({ bearerAuth: [] }));
      }
      const renamed = OPERATION_ID_RENAMES[operation.operationId];
      if (renamed) operation.operationId = renamed;
    }
  }

  return spec;
};

const main = async () => {
  const args = process.argv.slice(2);
  const valueOf = (flag: string) => {
    const index = args.indexOf(flag);
    return index === -1 ? undefined : args[index + 1];
  };

  const source = valueOf("--source") ?? process.env.MOBILE_SWAGGER_SOURCE;
  if (!source) {
    throw new Error(
      "no source given. Pass --source <path-or-url>, or set MOBILE_SWAGGER_SOURCE.\n" +
        "mobile-web does not publish its spec yet (the endpoint 401s), so this is\n" +
        "usually mobile-web's public/swagger/v1/swagger.yaml.",
    );
  }
  const out = valueOf("--out") ?? "swagger-mobile.yml";

  const spec = normalize(await toOpenApi3(parse(await readSource(source))));
  const overlay = parse(readFileSync(OVERLAY_PATH, "utf8")) ?? {};
  const merged = merge(spec, overlay) as Json;

  writeFileSync(out, stringify(merged, { lineWidth: 0 }));
  console.log(`Wrote ${out} from ${source}.`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
