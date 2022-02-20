import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Thunks } from './thunks';

interface GeneralState {
  carimbos: Carimbo[];
  favorecidos: Favorecido[];
  carimbosTable: {
    pageNumber: number;
    pageSize: number;
  };
  favorecidosTable: {
    pageNumber: number;
    pageSize: number;
  };
  selectedCarimboKey?: number;
  selectedFavorecidoKey?: number;
}

const initialState: GeneralState = {
  carimbos: [],
  favorecidos: [],
  carimbosTable: {
    pageNumber: 1,
    pageSize: 10,
  },
  favorecidosTable: {
    pageNumber: 1,
    pageSize: 10,
  },
  selectedFavorecidoKey: undefined,
  selectedCarimboKey: undefined,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedCarimboKey(state, action: PayloadAction<number>) {
      state.selectedCarimboKey = action.payload;
    },
    setSelectedFavorecidoKey(state, action: PayloadAction<number>) {
      state.selectedFavorecidoKey = action.payload;
    },
    setCarimbosPageSize(state, action: PayloadAction<number>) {
      state.carimbosTable.pageSize = action.payload;
    },
    setCarimbosPageNumber(state, action: PayloadAction<number>) {
      state.carimbosTable.pageNumber = action.payload;
    },
    setFavorecidosPageSize(state, action: PayloadAction<number>) {
      state.favorecidosTable.pageSize = action.payload;
    },
    setFavorecidosPageNumber(state, action: PayloadAction<number>) {
      state.favorecidosTable.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Thunks.getAllCarimbos.fulfilled, (state, action) => {
      state.carimbos = action.payload;
    });
    builder.addCase(Thunks.getAllFavorecidos.fulfilled, (state, action) => {
      state.favorecidos = action.payload;
    });
    builder.addCase(Thunks.createCarimbo.fulfilled, (state, action) => {
      state.carimbos = action.payload;
    });
    builder.addCase(Thunks.createFavorecido.fulfilled, (state, action) => {
      state.favorecidos = action.payload;
    });
    builder.addCase(Thunks.recoverDatabase.fulfilled, (state, action) => {
      state.carimbos = action.payload.carimbos;
      state.favorecidos = action.payload.favorecidos;
    });
    builder.addCase(Thunks.deleteCarimbo.fulfilled, (state, action) => {
      const deletedCarimboId = action.meta.arg;
      state.carimbos = state.carimbos.filter(
        (carimbo) => carimbo.ID !== deletedCarimboId
      );
    });
    builder.addCase(Thunks.deleteFavorecido.fulfilled, (state, action) => {
      const deletedFavorecidoId = action.meta.arg;
      state.favorecidos = state.favorecidos.filter(
        (carimbo) => carimbo.ID !== deletedFavorecidoId
      );
    });
  },
});

export const {
  setCarimbosPageNumber,
  setCarimbosPageSize,
  setFavorecidosPageNumber,
  setFavorecidosPageSize,
  setSelectedCarimboKey,
  setSelectedFavorecidoKey,
} = generalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.general;

export default generalSlice.reducer;
