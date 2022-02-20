import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  setCarimbosPageNumber,
  setCarimbosPageSize,
  setSelectedCarimboKey,
} from 'renderer/store/reducers/general';

type CarimbosTableProps = {
  carimbos: Carimbo[];
  printCarimbo: (value: Carimbo) => void;
  deleteCarimbo: (id: number) => void;
};

export const CarimbosTable = ({
  carimbos,
  printCarimbo,
  deleteCarimbo,
}: CarimbosTableProps) => {
  const [searchName, setSearchName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { carimbosTable, selectedCarimboKey } = useAppSelector(
    (state) => state.general
  );
  const { pageNumber, pageSize } = carimbosTable;
  const dispatch = useAppDispatch();
  const carimbosKey: CarimboKey[] = carimbos
    ?.map((c, idx) => ({
      ...c,
      key: idx + 1,
    }))
    .filter((value) =>
      value.NOME.toLowerCase().includes(searchName.toLowerCase())
    );
  const selected = selectedCarimboKey && carimbosKey[selectedCarimboKey - 1];

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
      title: 'CNPJ/CPF',
      dataIndex: 'CNPJ/CPF',
    },
    {
      title: 'Açoes',
      key: 'action',
      width: '10%',
      render: (text: any, record: Carimbo) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => deleteCarimbo(record.ID)}
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
      }}
    >
      <Table
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectedCarimboKey || ''],
          onChange: (change) => {
            const index = change[0] as any;
            dispatch(setSelectedCarimboKey(index));
          },
        }}
        size="small"
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              dispatch(setSelectedCarimboKey(record.key as any));
            },
          };
        }}
        scroll={{ x: 300, y: 300 }}
        pagination={{
          pageSize,
          current: pageNumber,
          onChange: (page, pagesize) => {
            if (page !== pageNumber) {
              dispatch(setCarimbosPageNumber(page));
            }
            if (pagesize !== pageSize) {
              dispatch(setCarimbosPageSize(pagesize));
            }
          },
        }}
        dataSource={carimbosKey}
      />
      <Button
        disabled={!selected}
        type="primary"
        onClick={() => selected && printCarimbo(selected)}
      >
        Imprimir carimbo
      </Button>
    </div>
  );
};
