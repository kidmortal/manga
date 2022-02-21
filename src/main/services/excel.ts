import { dialog } from 'electron';
import ExcelJS from 'exceljs';
import { join } from 'path';

export async function ExcelWriteCarimbo(carimbo: Carimbo) {
  const workbook = new ExcelJS.Workbook();
  try {
    const file = await workbook.xlsx.readFile('CARIMBO.xlsx');
    const worksheet = file.getWorksheet('CARIMBO');
    const name = worksheet.getCell(8, 2);
    const info = worksheet.getCell(8, 3);
    name.value = carimbo.NOME;
    info.value = carimbo['CNPJ/CPF'];
    workbook.xlsx.writeFile('CARIMBO.xlsx');
    return true;
  } catch (error) {
    dialog.showMessageBox({
      title: 'Error',
      message: `Arquivo CARIMBO.xlsx não localizado, \n verifique em ${process.cwd()} `,
    });
    return false;
  }
}

export async function ExcelWriteEnvelope(envelope: Envelope) {
  const workbook = new ExcelJS.Workbook();
  try {
    const file = await workbook.xlsx.readFile(
      join(process.cwd(), 'ENVELOPE.xlsx')
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
    workbook.xlsx.writeFile(join(process.cwd(), 'ENVELOPE.xlsx'));
    return true;
  } catch (error) {
    dialog.showMessageBox({
      title: 'Error',
      message: `Arquivo ENVELOPE.xlsx não localizado, \n verifique em ${process.cwd()} `,
    });
    return false;
  }
}
