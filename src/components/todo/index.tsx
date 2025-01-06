import { Card, Tooltip, Row, Col, notification, Button } from "antd";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UserInterface } from "../../App";
import { TodoResponse, todoService, UpdateTodo } from "../../service/todo.service";
import { useState } from "react";

interface TodoProps {
  user: UserInterface | null;
  todos: TodoResponse[] | [];
  fetchTodos: () => void;
}

const Todo = (props: TodoProps) => {
  const { user, todos, fetchTodos } = props;
  const [editFields, setEditFields] = useState<Partial<TodoResponse> | null>(null);

  async function handleStatusCompleted(todoId: string) {
    const response: TodoResponse | null = await todoService.statusCompleted(todoId);
    if (response) {
      notification.success({ message: "Status changed to completed" });
      fetchTodos();
    }
  }

  async function handleDelete(todoId: string) {
    const response = await todoService.delete(todoId);
    if (response) {
      notification.success({ message: "Todo deleted successfully" });
      fetchTodos();
    }
  }

  async function handleUpdateTodo() {
    if (!editFields?.title || !editFields?.description) {
      notification.error({ message: "Both 'Title' and 'Description' are required fields" });
      return;
    }
    const updatedFields: UpdateTodo = {
      title: editFields.title,
      description: editFields.description,
    };
    const response = await todoService.update(editFields._id as string, updatedFields);
    if (response) {
      notification.success({ message: "Todo updated successfully" });
      setEditFields(null);
      fetchTodos();
    }
  }

  function handleEditClick(todo: TodoResponse) {
    setEditFields({
      _id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  }

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEditFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return user && todos ? (
    <Row gutter={[16, 16]}>
      {todos.length ? (
        todos.map((todo) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={8} key={todo._id}>
            <Card
              title={
                editFields && editFields._id === todo._id ? (
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    onChange={handleFieldChange}
                    className="w-100 p-2"
                    value={editFields.title}
                  />
                ) : (
                  <span className="title-todo">{todo.title}</span>
                )
              }
              extra={
                <div className="d-flex gap-3 px-1">
                  {(!editFields || (editFields && editFields._id !== todo._id)) && (
                    <Tooltip title="Edit">
                      <EditOutlined onClick={() => handleEditClick(todo)} />
                    </Tooltip>
                  )}

                  {todo.status === "PENDING" && (
                    <Tooltip title="Mark as completed">
                      <CheckCircleOutlined onClick={() => handleStatusCompleted(todo._id)} />
                    </Tooltip>
                  )}

                  <Tooltip title="Delete">
                    <DeleteOutlined onClick={() => handleDelete(todo._id)} />
                  </Tooltip>
                </div>
              }
            >
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  {editFields && editFields._id === todo._id ? (
                    <textarea
                      name="description"
                      onChange={handleFieldChange}
                      placeholder="Enter description"
                      className="w-100 p-2"
                      value={editFields.description}
                    />
                  ) : (
                    <p>Description: {todo.description}</p>
                  )}
                  <p>
                    Status: <span style={{ color: todo.status === "PENDING" ? "black" : "green" }}>{todo.status}</span>
                  </p>
                  <p>
                    Created On: <span style={{ color: "black" }}>{new Date(todo.createdAt).toLocaleDateString("en-GB")}</span>
                  </p>
                </Col>

                {editFields && editFields._id === todo._id && (
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" onClick={handleUpdateTodo}>
                      Update Todo
                    </Button>
                    <Button type="default" className="mx-2" onClick={() => setEditFields(null)}>
                      Cancel
                    </Button>
                  </Col>
                )}
              </Row>
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}><h3 className="text-center">No todos found. Add a new one to get started!</h3></Col>
      )}
    </Row>
  ) : (
    <h3 className="text-center">Please Login to view or create todos</h3>
  );
};

export default Todo;
