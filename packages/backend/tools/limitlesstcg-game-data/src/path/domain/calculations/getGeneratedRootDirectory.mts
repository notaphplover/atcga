import path from 'node:path';

const currentDirectory: string = import.meta.dirname;

const generatedRootDirectory: string = path.join(
  currentDirectory,
  '../../../../generated',
);

export function getGeneratedRootDirectory(): string {
  return generatedRootDirectory;
}
