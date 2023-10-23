import { existsSync, unlinkSync } from "node:fs";
import {
  ClassDeclaration,
  MethodDeclaration,
  Project,
  SourceFile,
} from "ts-morph";

const project = new Project({});

const camelize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
const pascallize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const writeClientSource = (
  service: string,
  apiClass: ClassDeclaration,
  apiMethod: MethodDeclaration,
) => {
  const clientClassName = `${pascallize(service)}Client`;
  const clientSource =
    project.getSourceFile(`./src/generated/${service}/client.ts`) ??
    project.createSourceFile(
      `./src/generated/${service}/client.ts`,
      `
import {AxiosRequestConfig} from 'axios'
import FormData from 'form-data'
import {createReadStream} from 'fs';

export {BASE_PATH as ${service.toUpperCase()}_BASE_PATH} from './openapi/base'

class CustomFormData extends FormData {
  append(key: string, filename: any) {
    const stream = createReadStream(filename);
    super.append(key, stream, {filename})
  }
}

type Options = Readonly<{
  basePath?: string
  userAgent?: string
}>

export class ${clientClassName} {
  readonly version: string

  constructor(accessToken: string, { basePath, userAgent }: Options = {}) {
    if (!accessToken) {
      throw new Error("accessToken is required.")
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.version = require("../../../package.json").version
    const baseOptions = {
      ...(userAgent && {
        headers: {
          "User-Agent": userAgent,
        },
      }),
      maxBodyLength: Number.POSITIVE_INFINITY,
      maxContentLength: Number.POSITIVE_INFINITY,
    }
    const configuration = new Configuration({accessToken, basePath, formDataCtor: CustomFormData, baseOptions})
  }
}
`.trim(),
      { overwrite: true },
    );
  if (!clientSource.getImportDeclaration("./openapi")) {
    const namedImports: string[] = ["Configuration"];
    for (const [name] of apiSource.getExportedDeclarations()) {
      namedImports.push(name);
    }

    clientSource.addImportDeclaration({
      namedImports,
      moduleSpecifier: "./openapi",
    });
  }

  const clientClass = clientSource.getClassOrThrow(clientClassName);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const apiClassProperty = camelize(apiClass.getName()!);
  if (!clientClass.getProperty(apiClassProperty)) {
    clientClass
      .addProperty({
        name: apiClassProperty,
        isReadonly: true,
      })
      .toggleModifier("private", true);
    clientClass
      .getConstructors()[0]
      .addStatements(
        `this.${apiClassProperty} = new ${apiClass.getName()}(configuration)`,
      );
  }

  const parameters = apiMethod.getParameters();
  clientClass.addMethod({
    name: apiMethod.getName(),
    parameters: parameters.map((p) => p.getStructure()),
    docs: apiMethod.getJsDocs().map((d) => d.getStructure()),
    statements: `return this.${apiClassProperty}.${apiMethod.getName()}(${parameters
      .map((p) => p.getName())
      .join(", ")})`,
  });
  clientSource.saveSync();
};

let apiSource: SourceFile;

const main = () => {
  const service = process.argv[2];
  if (!service) throw new Error("Service not specified.");
  if (existsSync(`./src/generated/${service}/client.ts`))
    unlinkSync(`./src/generated/${service}/client.ts`);

  apiSource = project.addSourceFileAtPath(
    `./src/generated/${service}/openapi/api.ts`,
  );
  for (const apiClass of apiSource.getClasses()) {
    for (const apiMethod of apiClass.getMethods()) {
      writeClientSource(service, apiClass, apiMethod);
    }
  }
};

main();
