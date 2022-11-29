import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideCreateModal } from 'store/modalsSlice';

interface IValues {
  title: string;
  description: string;
}

const CreateModal = ({
  type,
  onCreate: onCreateCB,
}: {
  type: string;
  onCreate: (values: IValues) => void;
}) => {
  const { isCreateShown } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<IValues>();

  const hideModal = () => {
    dispatch(hideCreateModal());
  };

  const onCreate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        dispatch(hideCreateModal());
        onCreateCB(values);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <Modal
      title={`Create ${type}`}
      open={isCreateShown}
      onOk={onCreate}
      onCancel={hideModal}
      okText="Create"
      cancelText="Back"
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'should not be empty' }]}
        >
          <Input placeholder={`${type} Title`} allowClear />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'should not be empty' }]}
        >
          <Input placeholder="Description" type="textarea" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;