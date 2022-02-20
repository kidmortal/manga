const Printer = require('node-printer');

export function PrintFile(fileName: string) {
  console.log(Printer.list());
}

export function ListPrinters() {
  return Printer.list();
}
