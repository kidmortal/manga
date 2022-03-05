import { Button, Input, Form } from 'antd';
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
          type="primary"
          disabled={!selected || total <= 0}
          onClick={() =>
            selected &&
            api.printEnvelope(
              {
                favorecido: selected,
                valorCheques: cheque,
                valorEspecie: especie,
              },
              copyAmount
            )
          }
        >
          Envelope
        </Button>
        <Button
          disabled={!selected}
          type="primary"
          onClick={() => selected && api.printBancoVerso(selected, copyAmount)}
        >
          Banco Verso
        </Button>
        <Button
          disabled={!selected}
          type="primary"
          onClick={() =>
            selected && api.printFavorecidoFrente(selected, copyAmount)
          }
        >
          Favorecido frente
        </Button>
        <Button
          disabled={!selected}
          type="primary"
          onClick={() =>
            selected && api.printFavorecidoVerso(selected, copyAmount)
          }
        >
          Favorecido Verso
        </Button>
      </div>
    </div>
  );
}
