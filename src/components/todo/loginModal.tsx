import { Modal, Form, Input, Button, Row, Col } from "antd";

interface LoginModalProps {
  showModal: boolean;
  toggleModal: () => void;
  handleSubmit: (values: any) => void;
}

const LoginModal = ({
  showModal,
  toggleModal,
  handleSubmit,
}: LoginModalProps) => {
  return (
    <div>
      <Modal
        title="Login"
        open={showModal}
        onCancel={toggleModal}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please input a valid email address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
