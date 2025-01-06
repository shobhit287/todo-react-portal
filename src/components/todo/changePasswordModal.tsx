import { Modal, Button, Form, Input, Col, Row, notification } from "antd";
import { UserInterface } from "../../App";
import { UserService } from "../../service/user.service";
import useStore from "../../store";

interface changePasswordModalProps {
    user: UserInterface | null,
    showModal: string,
    toggleModal: () => void
}

export interface changePasswordInterface {
    oldPassword: string,
    newPassword: string,
}
const ChangePasswordModal = (props : changePasswordModalProps) => {
  const {showModal, toggleModal, user} = props;  
  const [form] = Form.useForm();
  const {apiCalling, setApiCalling} = useStore();

  const handleSubmit = async (values: changePasswordInterface) => {
    setApiCalling(true);
    const response : UserInterface | null = await UserService.changePassword(user?.userId, values);
    if(response != null && response != undefined) {
        notification.success({message: "Password changed successfully"});
        toggleModal();
    }  
    setApiCalling(false);
  };

  return (
    <Modal
      open={showModal ? true : false}
      title="Change Password"
      onCancel={toggleModal}
      footer={
        <Button type="primary" loading={apiCalling} form="changePasswordForm" key="submit" htmlType="submit">
          Submit
        </Button>
      }
    >
      <Form layout="vertical" name="changePasswordForm" onFinish={handleSubmit} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="oldPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Current Password",
                },
              ]}
            >
              <Input.Password placeholder="Old Password"/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your New Password" },
                {
                  validator(_, value) {
                    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?]).{8,}$/;
                    if (!value || regex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Invalid password. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
                      )
                    );
                  },
                },
              ]}
            >
              <Input.Password placeholder="New Password"/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The new password you entered does not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmed Password"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default ChangePasswordModal;