import { useState } from 'react';
import { Button, Popover } from 'antd';
import {
  BugOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  SearchOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from 'renderer/store/hooks';
import { Thunks } from 'renderer/store/reducers/thunks';
import { toast } from 'react-toastify';
import api from '../api';
import { AdicionarCarimbo } from './AdicionarCarimbo';
import { AdicionarFavorecido } from './AdicionarFavorecido';

export function Configuration() {
  const dispatch = useAppDispatch();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [carimboVisible, setCarimboVisible] = useState(false);
  const [favorecidoVisible, setFavorecidoVisible] = useState(false);

  async function listPrinters() {
    const printers = await api.listPrinters();
    toast(`Impressoras \n${printers}`, { autoClose: 5000, type: 'success' });
  }

  const ConfigurationPopover = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button
        type="primary"
        icon={<IdcardOutlined />}
        onClick={() => {
          setCarimboVisible(true);
          setPopoverOpen(false);
        }}
      >
        Adicionar Carimbo
      </Button>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        onClick={() => {
          setFavorecidoVisible(true);
          setPopoverOpen(false);
        }}
      >
        Adicionar Favorecido
      </Button>
      <Button
        type="primary"
        icon={<DatabaseOutlined />}
        onClick={() => {
          dispatch(Thunks.recoverDatabase());
          setPopoverOpen(false);
        }}
      >
        Recuperar banco de dados
      </Button>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => {
          listPrinters();
          setPopoverOpen(false);
        }}
      >
        Detectar Impressoras
      </Button>
      <Button
        type="primary"
        icon={<BugOutlined />}
        onClick={() => {
          api.debug();
          setPopoverOpen(false);
        }}
      >
        Debug
      </Button>
    </div>
  );

  return (
    <div>
      <Popover
        content={ConfigurationPopover}
        title="Configurações"
        trigger="click"
        placement="leftBottom"
        visible={popoverOpen}
      >
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={() => setPopoverOpen(!popoverOpen)}
        >
          Configuraçoes
        </Button>
      </Popover>
      <AdicionarCarimbo
        visible={carimboVisible}
        closeModal={() => setCarimboVisible(false)}
        addCarimbo={(carimbo) => dispatch(Thunks.createCarimbo(carimbo))}
      />
      <AdicionarFavorecido
        visible={favorecidoVisible}
        closeModal={() => setFavorecidoVisible(false)}
        addFavorecido={(favorecido) =>
          dispatch(Thunks.createFavorecido(favorecido))
        }
      />
    </div>
  );
}
