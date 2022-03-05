const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  on(channel, listener) {
    ipcRenderer.on(channel, listener);
  },
  once(channel, listener) {
    ipcRenderer.once(channel, listener);
  },
  emit(channel, payload) {
    ipcRenderer.send(channel, payload);
  },
});
