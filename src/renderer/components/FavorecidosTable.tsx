import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  setFavorecidosPageNumber,
  setFavorecidosPageSize,
  setSelectedFavorecidoKey,
} from 'renderer/store/reducers/general';

type FavorecidosTableProps = {
  favorecidos: Favorecido[];
  printFavorecido: (value: Favorecido) => void;
  deleteFavorecido: (id: number) => void;
};

export const FavorecidosTable = ({
  favorecidos,
  printFavorecido,
  deleteFavorecido,
}: FavorecidosTableProps) => {
  const [cheques, setCheques] = useState(0);
  const [especie, setEspecie] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const { favorecidosTable, selectedFavorecidoKey } = useAppSelector(
    (state) => state.general
  );
  const { pageNumber, pageSize } = favorecidosTable;
  const favorecidosKey: FavorecidoKey[] = favorecidos
    ?.map((c, idx) => ({
      ...c,
      key: idx + 1,
    }))
    .filter((value) =>
      value.NOME.toLowerCase().includes(searchName.toLowerCase())
    );
  const selected =
    selectedFavorecidoKey && favorecidosKey[selectedFavorecidoKey - 1];

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'NOME',
      filterDropdown: () => (
        <div style={{ width: '25rem', padding: '0.5rem' }}>
          <Input
            placeholder="Nome"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Space style={{ padding: '0.5rem' }}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => setSearchName(searchInput)}
            >
              Procurar
            </Button>
            <Button
              onClick={() => {
                setSearchName('');
                setSearchInput('');
              }}
            >
              Resetar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    },
    {
      title: 'Conta',
      dataIndex: 'CONTA',
      width: '15%',
    },
    {
      title: 'Agencia',
      dataIndex: 'AGENCIA',
      width: '10%',
    },
    {
      title: 'Banco',
      dataIndex: 'BANCO',
      width: '15%',
    },
    {
      title: 'Açoes',
      key: 'action',
      width: '10%',
      render: (text: any, record: Favorecido) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => deleteFavorecido(record.ID)}
            danger
          />
        </Space>
      ),
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '0 1rem',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '30rem',
          height: '6rem',
          backgroundColor: 'pink',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          borderRadius: '5px',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <span>{selected && selected.NOME}</span>
          <strong>{selected && selected.BANCO}</strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <span style={{ width: '7rem' }}>
            AG: {selected && selected.AGENCIA}
          </span>
          {cheques > 0 && `CHEQUES: R$ ${cheques}`}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <span style={{ width: '7rem' }}>{selected && selected.CONTA}</span>
          {especie > 0 && `ESPECIE: R$ ${especie}`}
        </div>
        <strong>TOTAL: R$ {especie + cheques}</strong>
      </div>
      <Table
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectedFavorecidoKey || ''],
          onChange: (change) => {
            const index = change[0] as any;
            dispatch(setSelectedFavorecidoKey(index));
          },
        }}
        size="small"
        scroll={{ x: 300, y: 300 }}
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(setSelectedFavorecidoKey(record.key as any));
            },
          };
        }}
        pagination={{
          pageSize,
          current: pageNumber,
          onChange: (page, pagesize) => {
            if (page !== pageNumber) {
              dispatch(setFavorecidosPageNumber(page));
            }
            if (pagesize !== pageSize) {
              dispatch(setFavorecidosPageSize(pagesize));
            }
          },
        }}
        columns={columns}
        dataSource={favorecidosKey}
      />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Input
          type="number"
          value={cheques}
          onChange={(e) => setCheques(Number(e.target.value))}
          prefix="Cheque:"
          suffix="R$"
        />
        <Input
          type="number"
          value={especie}
          onChange={(e) => setEspecie(Number(e.target.value))}
          prefix="Especie:"
          suffix="R$"
        />
        <Button
          type="primary"
          disabled={!selected}
          onClick={() => selected && printFavorecido(selected)}
        >
          Imprimir Favorecido
        </Button>
      </div>
    </div>
  );
};
