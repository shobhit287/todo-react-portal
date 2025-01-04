import { Modal, Form, Input, Button, Row, Col } from "antd";

interface SignupModalProps {
  showModal: boolean;
  toggleModal: () => void;
  handleSubmit: (values: any) => void;
}

const SignupModal = ({
  showModal,
  toggleModal,
  handleSubmit,
}: SignupModalProps) => {
  const passwordValidator = (_, value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (value && !regex.test(value)) {
      return Promise.reject(
        new Error(
          "Password must be at least 8 characters, with an uppercase letter, a number, and a special character."
        )
      );
    }
    return Promise.resolve();
  };

  return (
    <div>
      <Modal
        title="Sign Up"
        open={showModal}
        onCancel={toggleModal}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

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
                rules={[{required: true},{ validator: passwordValidator }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            
            <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
export default SignupModal;
