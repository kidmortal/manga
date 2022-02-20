import { Form, Input, Modal } from 'antd';

type ModalProps = {
  visible: boolean;
  closeModal: () => void;
  addFavorecido: (favorecido: FavorecidoNew) => void;
};

export const AdicionarFavorecido = ({
  visible,
  addFavorecido,
  closeModal,
}: ModalProps) => {
  const [form] = Form.useForm();

  async function validate() {
    try {
      const values = await form.validateFields();
      addFavorecido(values);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      title="Adicionar Favorecido"
      visible={visible}
      onOk={validate}
      onCancel={closeModal}
      width="20rem"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nome"
          name="NOME"
          rules={[{ required: true, message: 'Campo obrigatorio' }]}
        >
          <Input placeholder="fulano da silva..." />
        </Form.Item>
        <Form.Item
          label="Agencia"
          name="AGENCIA"
          rules={[{ required: true, message: 'Campo obrigatorio' }]}
        >
          <Input placeholder="4293-25" />
        </Form.Item>
        <Form.Item
          label="Conta"
          name="CONTA"
          rules={[{ required: true, message: 'Campo obrigatorio' }]}
        >
          <Input placeholder="221.23-25" />
        </Form.Item>
        <Form.Item
          label="Banco"
          name="BANCO"
          rules={[{ required: true, message: 'Campo obrigatorio' }]}
        >
          <Input placeholder="Banco do brasil, bradesco" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
