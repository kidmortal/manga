import { EnvelopePreview } from 'renderer/components/EnvelopePreview';
import { useAppSelector } from 'renderer/store/hooks';
import { FavorecidosTable } from '../../components/FavorecidosTable';
import styles from './index.module.scss';
import { EnvelopeSettings } from './settings';

export const EnvelopePage = () => {
  const {
    selectedFavorecidoKey,
    cheque,
    especie,
    favorecidos,
    favorecidosCopyAmount,
  } = useAppSelector((state) => state.general);
  const selected = favorecidos.find(
    (favorecido) => favorecido.ID === selectedFavorecidoKey
  );
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.envelopePreviewContainer}>
          <EnvelopePreview
            envelope={{
              favorecido: selected,
              valorCheques: cheque,
              valorEspecie: especie,
            }}
          />
        </div>
        <EnvelopeSettings
          selected={selected}
          cheque={cheque}
          especie={especie}
          copyAmount={favorecidosCopyAmount}
        />
      </div>
      <FavorecidosTable />
    </div>
  );
};
