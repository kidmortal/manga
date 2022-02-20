import { dialog } from 'electron';
import ExcelJS from 'exceljs';

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
    const file = await workbook.xlsx.readFile('ENVELOPE.xlsx');
    const worksheet = file.getWorksheet('ENVELOPE');
    const name = worksheet.getCell(1, 1);
    const conta = worksheet.getCell(17, 2);
    const agencia = worksheet.getCell(17, 3);
    const total = worksheet.getCell(17, 4);
    const chequesLabel = worksheet.getCell(15, 3);
    const especieLabel = worksheet.getCell(15, 4);
    const chequesValue = worksheet.getCell(14, 3);
    const especieValue = worksheet.getCell(14, 4);
    conta.value = envelope.favorecido.CONTA;
    name.value = envelope.favorecido.NOME;
    agencia.value = envelope.favorecido.AGENCIA;
    total.value = envelope.valorCheques + envelope.valorEspecie;
    chequesValue.value = envelope.valorCheques;
    especieValue.value = envelope.valorEspecie;
    chequesLabel.value = '';
    especieLabel.value = '';
    if (envelope.valorCheques) chequesLabel.value = 'CHEQUES';
    if (envelope.valorEspecie) especieLabel.value = 'ESPECIE';
    workbook.xlsx.writeFile('ENVELOPE.xlsx');
    return true;
  } catch (error) {
    dialog.showMessageBox({
      title: 'Error',
      message: `Arquivo ENVELOPE.xlsx não localizado, \n verifique em ${process.cwd()} `,
    });
    return false;
  }
}
