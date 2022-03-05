function promise<T>(channel: string) {
  return new Promise<T>((resolve, reject) => {
    electron.once(channel, (_, payload) => {
      resolve(payload as T);
    });
  });
}

export default {
  getAllCarimbos() {
    electron.emit('getAllCarimbos');
    return promise<Carimbo[]>('getAllCarimbos');
  },
  createCarimbo(carimbo: CarimboNew) {
    electron.emit('createCarimbo', carimbo);
    return promise<any>('createCarimbo');
  },
  deleteCarimbo(id: number) {
    electron.emit('deleteCarimbo', id);
    return promise<any>('deleteCarimbo');
  },
  createFavorecido(favorecido: FavorecidoNew) {
    electron.emit('createFavorecido', favorecido);
    return promise<any>('createFavorecido');
  },
  deleteFavorecido(id: number) {
    electron.emit('deleteFavorecido', id);
    return promise<any>('deleteFavorecido');
  },
  getAllFavorecidos() {
    electron.emit('getAllFavorecidos');
    return promise<Favorecido[]>('getAllFavorecidos');
  },
  listPrinters() {
    electron.emit('listPrinters');
    return promise<any>('listPrinters');
  },
  printCarimbo(carimbo: Carimbo) {
    electron.emit('printCarimbo', carimbo);
    return promise<any>('printCarimbo');
  },
  printFavorecido(favorecido: Favorecido) {
    electron.emit('printFavorecido', favorecido);
    return promise<any>('printFavorecido');
  },
  printEnvelope(envelope: Envelope) {
    electron.emit('printEnvelope', envelope);
    return promise<any>('printEnvelope');
  },
  recoverDatabase() {
    electron.emit('recoverDatabase');
    return promise<any>('recoverDatabase');
  },
  debug() {
    electron.emit('debug');
    return promise<any>('debug');
  },
};
