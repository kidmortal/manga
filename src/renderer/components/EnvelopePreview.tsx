import { formatCurrency } from 'renderer/utils';

type EnvelopePreviewProps = {
  envelope: {
    favorecido?: Favorecido;
    valorEspecie: number;
    valorCheques: number;
  };
};

export function EnvelopePreview({ envelope }: EnvelopePreviewProps) {
  const { favorecido, valorCheques, valorEspecie } = envelope;
  const total = valorEspecie + valorCheques;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          width: '30rem',
          height: '10rem',
          backgroundColor: 'pink',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          borderRadius: '5px',
          gap: '0.5rem',
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
          <span>{favorecido && favorecido.NOME}</span>
          <strong>{favorecido && favorecido.BANCO}</strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <span style={{ width: '8rem' }}>
            AG: {favorecido && favorecido.AGENCIA}
          </span>
          {valorCheques > 0 && `CHEQUES: ${formatCurrency(valorCheques)}`}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <span style={{ width: '8rem' }}>
            {favorecido && favorecido.CONTA}
          </span>
          {valorEspecie > 0 && `ESPECIE: ${formatCurrency(valorEspecie)}`}
        </div>
        <strong>TOTAL: {formatCurrency(total)}</strong>
      </div>
    </div>
  );
}
