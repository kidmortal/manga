import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { Thunks } from 'renderer/store/reducers/thunks';
import { FavorecidosTable } from '../components/FavorecidosTable';
import actions from '../api';

export const FavorecidoPage = () => {
  const dispatch = useAppDispatch();
  const favorecidos = useAppSelector((state) => state.general.favorecidos);

  async function printFavorecido(favorecido: Favorecido) {
    const response = await actions.printFavorecido(favorecido);
  }

  async function deletFavorecido(id: number) {
    dispatch(Thunks.deleteFavorecido(id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          padding: '2rem',
        }}
      >
        <FavorecidosTable
          favorecidos={favorecidos}
          printFavorecido={printFavorecido}
          deleteFavorecido={deletFavorecido}
        />
      </div>
    </div>
  );
};
