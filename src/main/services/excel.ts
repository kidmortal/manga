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
    console.log('no file on the folder named CARIMBO.xlsx');
    return false;
  }
}
