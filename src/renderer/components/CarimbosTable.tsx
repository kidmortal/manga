import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Row, Space, Table } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  setCarimbosPageNumber,
  setCarimbosPageSize,
  setSelectedCarimboKey,
} from 'renderer/store/reducers/general';

type CarimbosTableProps = {
  carimbos: Carimbo[];
  printCarimbo: (value: CarimboPrint) => void;
  deleteCarimbo: (id: number) => void;
};

export const CarimbosTable = ({
  carimbos,
  printCarimbo,
  deleteCarimbo,
}: CarimbosTableProps) => {
  const [loading, setLoading] = useState(false);
  const [copies, setCopies] = useState(1);
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
      <Row justify="center">
        <Space align="center" direction="horizontal">
          <Input
            type="number"
            min={1}
            style={{ width: '8rem' }}
            prefix="Copias: "
            placeholder="1"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
          />
          <Button
            disabled={!selected}
            loading={loading}
            type="primary"
            onClick={() => {
              if (selected) {
                printCarimbo({ ...selected, copies });
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }
            }}
          >
            Imprimir carimbo
          </Button>
        </Space>
      </Row>
    </div>
  );
};
