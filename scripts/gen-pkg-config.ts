import { zodToJsonSchema } from "zod-to-json-schema";
import path from "path";
import fs from "fs-extra";
import { configSchema } from "../src/config/schema";
import { fixObject } from "../src/js-utils";
import { EXT_ID_CAMELCASE } from "../src/lib/constants";

// Get the package.json file
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = fs.readJsonSync(packageJsonPath);

//  Generate the configuration schema
let configuration = zodToJsonSchema(configSchema) as any;

// Prefix all keys with the extension id
configuration["properties"] = fixObject(configuration["properties"], {
  updateKey: (k) => `${EXT_ID_CAMELCASE}.${k}`,
});

// Remove unnecessary keys
delete configuration["$schema"];

// Set the title
configuration["title"] = "Cursor Plus";

// Update all references to point to the correct key
configuration = JSON.parse(
  JSON.stringify(configuration).replace(
    /(?<="\$ref":"#\/properties\/)([a-zA-Z0-9\.]+)/g,
    "cursorPlus.$1",
  ),
);

// Make some arrays accept unique items
configuration["properties"]["cursorPlus.hiddenMessages"]["uniqueItems"] = true;
configuration["properties"]["cursorPlus.savedCommands"]["uniqueItems"] = true;

// Apply changes
packageJson["contributes"]["configuration"] = configuration;

// Write the changes to the package.json file
fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
