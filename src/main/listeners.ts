import { app, dialog, ipcMain } from 'electron';
import { database, RecoverDatabase } from './database/database';
import {
  ExcelWriteCarimbo,
  ExcelWriteEnvelope,
  ExcelWriteFavorecidoBancoVerso,
  ExcelWriteFavorecidoNomeFrente,
  ExcelWriteFavorecidoNomeVerso,
} from './services/excel';
import { PrintFile } from './services/printer';

ipcMain.on('getAllCarimbos', async (event, arg) => {
  const carimbos = await database.getAllCarimbos();
  event.reply('getAllCarimbos', carimbos);
});

ipcMain.on('createCarimbo', async (event, arg: CarimboNew) => {
  const response = await database.createCarimbo(arg);
  event.reply('createCarimbo', response);
});

ipcMain.on('deleteCarimbo', async (event, arg: number) => {
  const response = await database.deleteCarimbo(arg);
  event.reply('deleteCarimbo', response);
});

ipcMain.on('createFavorecido', async (event, arg: FavorecidoNew) => {
  const response = await database.createFavorecido(arg);
  event.reply('createFavorecido', response);
});

ipcMain.on('deleteFavorecido', async (event, arg: number) => {
  const response = await database.deleteFavorecido(arg);
  event.reply('deleteFavorecido', response);
});

ipcMain.on('recoverDatabase', async (event, arg: number) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
  });
  const path = result.filePaths[0];
  let data;
  if (path) {
    data = await RecoverDatabase(path);
  }
  event.reply('recoverDatabase', data);
});

ipcMain.on('updateCarimbo', async (event, arg: Carimbo) => {
  const response = await database.updateCarimbo(arg.ID, arg);
  event.reply('updateCarimbo', response);
});

ipcMain.on('getAllCarimbos', async (event, arg) => {
  const carimbos = await database.getAllCarimbos();
  event.reply('getAllCarimbos', carimbos);
});

ipcMain.on('getAllFavorecidos', async (event, arg) => {
  const favorecidos = await database.getAllFavorecidos();
  event.reply('getAllFavorecidos', favorecidos);
});

ipcMain.on('printCarimbo', async (event, arg: CarimboPrint) => {
  const success = await ExcelWriteCarimbo(arg);
  if (success) PrintFile('CARIMBO.xlsx');
  event.reply('printCarimbo', { message: 'ok' });
});

ipcMain.on(
  'printEnvelope',
  async (event, arg: { envelope: Envelope; copy: number }) => {
    const success = await ExcelWriteEnvelope(arg.envelope, arg.copy);
    if (success) PrintFile('ENVELOPE.xlsx');
    event.reply('printEnvelope', { message: 'ok' });
  }
);

ipcMain.on(
  'printBancoVerso',
  async (event, arg: { favorecido: Favorecido; copy: number }) => {
    const success = await ExcelWriteFavorecidoBancoVerso(
      arg.favorecido,
      arg.copy
    );
    if (success) PrintFile('FAVOVERSO.xlsx');
    event.reply('printBancoVerso', { message: 'ok' });
  }
);

ipcMain.on(
  'printFavorecidoFrente',
  async (event, arg: { favorecido: Favorecido; copy: number }) => {
    const success = await ExcelWriteFavorecidoNomeFrente(
      arg.favorecido,
      arg.copy
    );
    if (success) PrintFile('FRENTE.xlsx');
    event.reply('printFavorecidoFrente', { message: 'ok' });
  }
);

ipcMain.on(
  'printFavorecidoVerso',
  async (event, arg: { favorecido: Favorecido; copy: number }) => {
    const success = await ExcelWriteFavorecidoNomeVerso(
      arg.favorecido,
      arg.copy
    );
    if (success) PrintFile('VERSO.xlsx');
    event.reply('printFavorecidoVerso', { message: 'ok' });
  }
);

ipcMain.on('debug', async (event, arg) => {
  const dir = [];
  dir.push(`app path: ${app.getAppPath()}`);
  dir.push(`app.exe path: ${app.getPath('exe')}`);
  dir.push(`cwb path: ${process.cwd()}`);
  dir.push(`exec path: ${process.execPath}`);
  dir.push(`dirname path: ${__dirname}`);
  dir.push(`storage path: ${app.getPath('userData')}`);
  dialog.showMessageBox({ title: 'Debug message', message: dir.join('\n') });
  event.reply('debug', 'ok');
});
