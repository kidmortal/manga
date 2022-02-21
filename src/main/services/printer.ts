import { PowerShell } from 'node-powershell';
import { app, dialog } from 'electron';
import { join } from 'path';

export function PrintFile(fileName: string) {
  if (process.platform === 'linux') {
    return dialog.showErrorBox(
      'OS Not supported',
      'Print function only available on windows'
    );
  }

  PowerShell.$`start-process -filepath ${join(
    app.getPath('userData'),
    `\\${fileName}`
  )} -verb print`
    .then((response) => response)
    .catch((err) => {
      dialog.showErrorBox('Error using Powershell', JSON.stringify(err));
    });
}
