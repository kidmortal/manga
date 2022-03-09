import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import api from 'renderer/api';
import { useAppDispatch } from 'renderer/store/hooks';
import {
  setChequeValue,
  setEspecieValue,
  setFavorecidosCopyAmount,
} from 'renderer/store/reducers/general';
import styles from './index.module.scss';

type EnvelopeSettingsProps = {
  selected?: Favorecido;
  cheque: number;
  especie: number;
  copyAmount: number;
};

export function EnvelopeSettings({
  selected,
  cheque,
  especie,
  copyAmount,
}: EnvelopeSettingsProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const total = cheque + especie;

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.rowContainer}>
        <Form
          className={styles.inputsContainer}
          name="basic"
          layout="horizontal"
        >
          <Form.Item label="Cheque">
            <Input
              type="number"
              min={0}
              value={cheque}
              onChange={(e) => dispatch(setChequeValue(Number(e.target.value)))}
              suffix="R$"
            />
          </Form.Item>
          <Form.Item label="Especie">
            <Input
              type="number"
              min={0}
              value={especie}
              onChange={(e) =>
                dispatch(setEspecieValue(Number(e.target.value)))
              }
              suffix="R$"
            />
          </Form.Item>
          <Form.Item label="Copias">
            <Input
              type="number"
              min={1}
              value={copyAmount}
              onChange={(e) =>
                dispatch(setFavorecidosCopyAmount(Number(e.target.value)))
              }
            />
          </Form.Item>
        </Form>
      </div>
      <div className={styles.columnContainer}>
        <Button
          loading={loading}
          type="primary"
          disabled={!selected || total <= 0}
          onClick={() => {
            if (selected) {
              api.printEnvelope(
                {
                  favorecido: selected,
                  valorCheques: cheque,
                  valorEspecie: especie,
                },
                copyAmount
              );
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 4000);
            }
          }}
        >
          Envelope
        </Button>
        <Button
          loading={loading}
          disabled={!selected}
          type="primary"
          onClick={() => {
            if (selected) {
              api.printBancoVerso(selected, copyAmount);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 4000);
            }
          }}
        >
          Banco Verso
        </Button>
        <Button
          loading={loading}
          disabled={!selected}
          type="primary"
          onClick={() => {
            if (selected) {
              api.printFavorecidoFrente(selected, copyAmount);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 4000);
            }
          }}
        >
          Favorecido frente
        </Button>
        <Button
          loading={loading}
          disabled={!selected}
          type="primary"
          onClick={() => {
            if (selected) {
              api.printFavorecidoVerso(selected, copyAmount);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 4000);
            }
          }}
        >
          Favorecido Verso
        </Button>
      </div>
    </div>
  );
}
