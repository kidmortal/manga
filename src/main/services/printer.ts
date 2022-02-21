import { execSync } from 'child_process';
import { dialog } from 'electron';
import { join } from 'path';

export function PrintFile(fileName: string) {
  if (process.platform === 'linux') {
    return dialog.showErrorBox(
      'OS Not supported',
      'Print function only available on windows'
    );
  }
  execSync(
    `start-process -filepath ${join(process.cwd(), fileName)} -verb print`
  );
}
