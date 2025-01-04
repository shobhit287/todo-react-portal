import { Card, Tooltip, Row, Col } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const Todo = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <Card
          title="Todo Task"
          extra={
            <div className="d-flex gap-3">
            <Tooltip title="Mark as completed">
              <CheckCircleOutlined />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined />
            </Tooltip>
            </div>
          }
        >
          <p>Description: Complete the task by the end of the day.</p>
          <p>
            Status: <span style={{ color: "black" }}>PENDING</span>
          </p>
        </Card>
      </Col>
    </Row>
  );
};
export default Todo;
