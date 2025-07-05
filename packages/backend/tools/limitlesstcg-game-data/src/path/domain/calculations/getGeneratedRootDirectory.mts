import path from 'node:path';

const currentDirectory: string = import.meta.dirname;

// Keep in mind this file is compiled at  "lib/cjs" or "lib/esm" level
const generatedRootDirectory: string = path.join(
  currentDirectory,
  '../../../../../generated',
);

export function getGeneratedRootDirectory(): string {
  return generatedRootDirectory;
}
