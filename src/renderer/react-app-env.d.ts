interface ElectronIPC {
  emit: (channel: string, payload?: object | number | string) => void;
  on: (
    channel: string,
    callback: (event: object, payload: unknown) => void
  ) => void;
  once: (
    channel: string,
    callback: (event: object, payload: unknown) => void
  ) => void;
}
declare const electron: ElectronIPC;

type PingResponse = {
  message: string;
};

type CarimboNew = {
  NOME: string;
  'CNPJ/CPF': string;
};
type FavorecidoNew = {
  AGENCIA: string;
  BANCO: string;
  CONTA: string;
  NOME: string;
};

type Carimbo = {
  ID: number;
  NOME: string;
  'CNPJ/CPF': string;
};

type Envelope = {
  favorecido: Favorecido;
  valorCheques: number;
  valorEspecie: number;
};

type Favorecido = {
  ID: number;
  AGENCIA: string;
  BANCO: string;
  CONTA: string;
  NOME: string;
};

type FavorecidoKey = {
  ID: number;
  key: React.Key;
  AGENCIA: string;
  BANCO: string;
  CONTA: string;
  NOME: string;
};

type CarimboKey = {
  ID: number;
  key: React.Key;
  NOME: string;
  'CNPJ/CPF': string;
};
