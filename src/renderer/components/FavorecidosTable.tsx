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
      key: idx,
    }))
    .filter((value) =>
      value.NOME.toLowerCase().includes(searchName.toLowerCase())
    );
  const selected =
    selectedFavorecidoKey && favorecidosKey[selectedFavorecidoKey];

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
        padding: '1rem',
        width: '100%',
      }}
    >
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
      <Button
        type="primary"
        disabled={!selected}
        onClick={() => selected && printFavorecido(selected)}
      >
        Imprimir Favorecido
      </Button>
    </div>
  );
};
