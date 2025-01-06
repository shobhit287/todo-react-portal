import { Modal, Form, Input, Button, Row, Col } from "antd";
import { UserInterface } from "../../App";
import { useEffect } from "react";
import useStore from "../../store";

interface CreateUpdateModalProps {
  showModal: string;
  user: UserInterface | null;
  mode: string;
  toggleModal: () => void;
  handleSubmit: (values: any) => void;
}

const CreateUpdateModal = ({
  showModal,
  toggleModal,
  handleSubmit,
  user,
  mode
}: CreateUpdateModalProps) => {
  const [form] = Form.useForm();
  const {apiCalling} = useStore();

  useEffect(() => {
    if(mode == "Update" && user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, []);
  const passwordValidator = (_: any, value: string) => {
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
        title={`${mode} User`}
        open={showModal ? true : false}
        onCancel={toggleModal}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name" },
                ]}
              >
                <Input placeholder="First Name"/>
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
                <Input placeholder="Last Name"/>
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
                <Input placeholder="Email"/>
              </Form.Item>
            </Col>
            
            {mode == "Create" && (
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{required: true},{ validator: passwordValidator }]}
              >
                <Input.Password placeholder="Password"/>
              </Form.Item>
            </Col>
            )}
            
            <Col span={24}>
            <Form.Item>
              <Button type="primary" loading={apiCalling} htmlType="submit" block>
                {mode == "Create" ? "Sign Up" : "Update"}
              </Button>
            </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
export default CreateUpdateModal;
