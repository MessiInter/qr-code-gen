import {join} from 'path';

export function getFiles(dir = '.', pattern = '*'): string[] {
  let files: string[] = [];

  cy.exec(`find ${join(dir, pattern)} -maxdepth 1 -type f`).then(
    ({stdout}: {stdout: string}) => {
      files = stdout.split(/\r\n|\n|\r/g);
    }
  );

  return files;
}
