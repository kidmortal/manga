import { Button, notification } from 'antd';
import { IdcardOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from 'renderer/store/hooks';
import { Thunks } from 'renderer/store/reducers/thunks';
import { Configuration } from './Configuration';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function fetchAll() {
    dispatch(Thunks.getAllCarimbos());
    dispatch(Thunks.getAllFavorecidos());
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={() => fetchAll()}
        />
        <Button
          type="primary"
          icon={<IdcardOutlined />}
          onClick={() => navigate('/carimbo')}
        >
          Carimbos
        </Button>
        <Button
          type="primary"
          icon={<UserOutlined />}
          onClick={() => navigate('/favorecido')}
        >
          Favorecidos
        </Button>
      </div>
      <Configuration />
    </div>
  );
}
