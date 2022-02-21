import { execSync } from 'child_process';
import { dialog } from 'electron';

export function PrintFile(fileName: string) {
  if (process.platform === 'linux') {
    return dialog.showErrorBox(
      'OS Not supported',
      'Print function only available on windows'
    );
  }
  execSync(
    `start-process -filepath C:\\Users\\user\\Documents\\${fileName} -verb print`
  );
}
