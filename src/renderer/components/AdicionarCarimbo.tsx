import { Form, Input, Modal } from 'antd';

type ModalProps = {
  visible: boolean;
  closeModal: () => void;
  addCarimbo: (carimbo: CarimboNew) => void;
};

export const AdicionarCarimbo = ({
  visible,
  addCarimbo,
  closeModal,
}: ModalProps) => {
  const [form] = Form.useForm();

  async function validate() {
    try {
      const values = await form.validateFields();
      addCarimbo(values);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      title="Adicionar Carimbo"
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
          label="CNPJ / CPF"
          name="CNPJ/CPF"
          rules={[{ required: true, message: 'Campo obrigatorio' }]}
        >
          <Input placeholder="999.999.999-99" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
