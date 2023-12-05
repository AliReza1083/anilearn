// @ts-nocheck

const path = require("path");
const fs = require("fs");

const REGISTRY_PATH = path.join(process.cwd(), "registry");
const READ_PATH = fs.readdirSync(REGISTRY_PATH);

let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {`;

for (const folder of READ_PATH) {
  const FOLDER_PATH = path.join(process.cwd(), `registry/${folder}`);
  const READ_FILES = fs.readdirSync(FOLDER_PATH);

  for (const file of READ_FILES) {
    const stats = fs.statSync(`${FOLDER_PATH}/${file}`);

    if (!stats.isDirectory()) {
      index += `
        "${file.replace(".tsx", "")}": {
          name: "${file.replace(".tsx", "")}",
          component: React.lazy(() => import("@/registry/${folder}/${file}")),
        },`;
    } else {
      const SUB_FOLDER_PATH = path.join(
        process.cwd(),
        `registry/${folder}/${file}`
      );
      const SUB_READ_FILES = fs.readdirSync(SUB_FOLDER_PATH);
      for (const subFiles of SUB_READ_FILES) {
        index += `
        "${file}-${subFiles.replace(".tsx", "")}": {
          name: "${file}-${subFiles.replace(".tsx", "")}",
          component: React.lazy(() => import("@/registry/${folder}/${file}/${subFiles}")),
        },`;
      }
    }
  }
}

index += `
},`;

fs.writeFileSync(path.join(process.cwd(), "__registry__/index.tsx"), index);