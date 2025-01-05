import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import { TodoResponse, todoService } from "../../service/todo.service";
interface CreateTodoProps {
  showModal: string;
  toggleModal: () => void;
  fetchTodos: () => void;
}

export interface CreateTodo {
  title: string;
  description: string;
}

const CreateTodoModal = (props: CreateTodoProps) => {
  const { showModal, toggleModal, fetchTodos} = props;
  async function handleSubmit(values: CreateTodo) {
    const response : TodoResponse | null = await todoService.create(values);
    if(response != null && response != undefined) {
        notification.success({message: "Todo created successfully"});
        fetchTodos();
        toggleModal();
    }
  }
  return (
    <>
      <Modal
        title="Create Todo"
        open={showModal ? true : false}
        onCancel={toggleModal}
        footer={null}
      >
        <Form name="createTodoForm" layout="vertical" onFinish={handleSubmit}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please input title" }]}
              >
                <Input placeholder="Todo Title" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
              >
                <Input.TextArea placeholder="Todo Description" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default CreateTodoModal;
