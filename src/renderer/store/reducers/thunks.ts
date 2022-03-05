import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'renderer/api';

export const Thunks = {
  getAllCarimbos: createAsyncThunk('general/getllAllCarimbos', async () => {
    const carimbos = await api.getAllCarimbos();
    return carimbos;
  }),
  getAllFavorecidos: createAsyncThunk('general/getAllFavorecidos', async () => {
    const favorecidos = await api.getAllFavorecidos();
    return favorecidos;
  }),
  deleteCarimbo: createAsyncThunk(
    'general/deleteCarimbo',
    async (id: number) => {
      const response = await api.deleteCarimbo(id);
      return response;
    }
  ),
  createCarimbo: createAsyncThunk(
    'general/createCarimbo',
    async (carimbo: CarimboNew) => {
      const response = await api.createCarimbo(carimbo);
      return response;
    }
  ),
  deleteFavorecido: createAsyncThunk(
    'general/deleteFavorecido',
    async (id: number) => {
      const response = await api.deleteFavorecido(id);
      return response;
    }
  ),
  createFavorecido: createAsyncThunk(
    'general/createFavorecido',
    async (favorecido: FavorecidoNew) => {
      const response = await api.createFavorecido(favorecido);
      return response;
    }
  ),
  recoverDatabase: createAsyncThunk('general/recoverDatabase', async () => {
    const response = await api.recoverDatabase();
    return response;
  }),
};
