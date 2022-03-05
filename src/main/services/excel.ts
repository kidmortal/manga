import { app, dialog } from 'electron';
import ExcelJS from 'exceljs';
import { join } from 'path';

function excelPath() {
  return process.platform === 'linux' ? '/manga.xlsx' : '\\manga.xlsx';
}

export async function ExcelWriteCarimbo(carimbo: CarimboPrint) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath();
  try {
    const file = await workbook.xlsx.readFile(
      join(app.getPath('userData'), path)
    );
    const worksheet = file.getWorksheet('CARIMBO');
    const name = worksheet.getCell(8, 2);
    const info = worksheet.getCell(8, 3);
    name.value = carimbo.NOME;
    info.value = carimbo['CNPJ/CPF'];
    worksheet.pageSetup.copies = carimbo.copies;
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    dialog.showMessageBox({
      title: 'Error',
      message: `Arquivo ${join(
        app.getPath('userData'),
        path
      )} não localizado, \n verifique em ${app.getPath('userData')} `,
    });
    return false;
  }
}

export async function ExcelWriteEnvelope(envelope: Envelope) {
  const workbook = new ExcelJS.Workbook();
  const path = excelPath();
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
    workbook.xlsx.writeFile(join(app.getPath('userData'), path));
    return true;
  } catch (error) {
    dialog.showMessageBox({
      title: 'Error',
      message: `Arquivo ${join(
        path
      )} não localizado, \n verifique em ${app.getPath('userData')} `,
    });
    return false;
  }
}
