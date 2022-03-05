import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { Thunks } from 'renderer/store/reducers/thunks';
import { CarimbosTable } from '../../components/CarimbosTable';
import actions from '../../api';

export const CarimboPage = () => {
  const dispatch = useAppDispatch();
  const { carimbos } = useAppSelector((state) => state.general);

  async function printCarimbo(carimbo: Carimbo) {
    const response = await actions.printCarimbo(carimbo);
  }

  async function deleteCarimboHandler(id: number) {
    dispatch(Thunks.deleteCarimbo(id));
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          padding: '1rem',
        }}
      >
        <CarimbosTable
          carimbos={carimbos}
          printCarimbo={printCarimbo}
          deleteCarimbo={deleteCarimboHandler}
        />
      </div>
    </div>
  );
};
