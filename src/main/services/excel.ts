import { app, dialog, shell } from 'electron';
import ExcelJS from 'exceljs';
import { join } from 'path';

function excelPath(name: string) {
  return process.platform === 'linux' ? `/${name}.xlsx` : `\\${name}.xlsx`;
}

function notFoundDialog(path: string) {
  shell.openPath(app.getPath('userData'));
  dialog.showMessageBox({
    title: 'Error',
    message: `Arquivo ${join(
      app.getPath('userData'),
      path
    )} não localizado, \n verifique em ${app.getPath('userData')} `,
  });
}

export async function ExcelWriteCarimbo(carimbo: CarimboPrint) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath('CARIMBO');
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('CARIMBO');
    const name = worksheet.getCell(8, 2);
    const info = worksheet.getCell(8, 3);
    name.value = carimbo.NOME;
    info.value = carimbo['CNPJ/CPF'];
    // This ignore is needed, because the lib doesnt allow you to change it, but its needed here
    // @ts-ignore
    worksheet.pageSetup.copies = carimbo.copies;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    notFoundDialog(path);
    return false;
  }
}

export async function ExcelWriteEnvelope(
  envelope: Envelope,
  copyAmount: number
) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath('ENVELOPE');
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('ENVELOPE');
    const name = worksheet.getCell(1, 1);
    const conta = worksheet.getCell(17, 2);
    const agencia = worksheet.getCell(17, 3);
    const total = worksheet.getCell(17, 4);
    const chequesLabel = worksheet.getCell(15, 3);
    const especieLabel = worksheet.getCell(15, 4);
    const chequesValue = worksheet.getCell(14, 3);
    const especieValue = worksheet.getCell(14, 4);
    const { favorecido, valorCheques, valorEspecie } = envelope;
    conta.value = favorecido.CONTA;
    name.value = favorecido.NOME;
    agencia.value = `AG: ${favorecido.AGENCIA}`;
    total.value = valorCheques + valorEspecie;
    chequesValue.value = valorCheques > 0 ? valorCheques : '';
    especieValue.value = valorEspecie > 0 ? valorEspecie : '';
    chequesLabel.value = valorCheques > 0 ? 'CHEQUES' : '';
    especieLabel.value = valorEspecie > 0 ? 'ESPECIE' : '';
    // This ignore is needed, because the lib doesnt allow you to change it, but its needed here
    // @ts-ignore
    worksheet.pageSetup.copies = copyAmount;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    notFoundDialog(path);
    return false;
  }
}

export async function ExcelWriteFavorecidoNomeVerso(
  favorecido: Favorecido,
  copyAmount: number
) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath('FAVOVERSO');
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('FAVOVERSO');
    const name = worksheet.getCell(21, 2);
    name.value = favorecido.NOME;
    // This ignore is needed, because the lib doesnt allow you to change it, but its needed here
    // @ts-ignore
    worksheet.pageSetup.copies = copyAmount;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    notFoundDialog(path);
    return false;
  }
}

export async function ExcelWriteFavorecidoNomeFrente(
  favorecido: Favorecido,
  copyAmount: number
) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath('FRENTE');
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('FRENTE');
    const name = worksheet.getCell(6, 1);
    name.value = favorecido.NOME;
    // This ignore is needed, because the lib doesnt allow you to change it, but its needed here
    // @ts-ignore
    worksheet.pageSetup.copies = copyAmount;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    notFoundDialog(path);
    return false;
  }
}

export async function ExcelWriteFavorecidoBancoVerso(
  favorecido: Favorecido,
  copyAmount: number
) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath('VERSO');
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('VERSO');
    const agencia = worksheet.getCell(21, 2);
    const conta = worksheet.getCell(21, 4);
    agencia.value = favorecido.AGENCIA;
    conta.value = favorecido.CONTA;
    // This ignore is needed, because the lib doesnt allow you to change it, but its needed here
    // @ts-ignore
    worksheet.pageSetup.copies = copyAmount;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    notFoundDialog(path);
    return false;
  }
}
