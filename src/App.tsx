import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import downArrow from "./assets/downArrow.png";
import Todo from "./components/todo";
import { Card, Col, Input, notification, Row, Dropdown, Space } from "antd";
import CreateUpdateModal from "./components/todo/createUpdateModal";
import LoginModal from "./components/todo/loginModal";
import CreateTodoModal from "./components/todo/createTodoModal";
import ChangePasswordModal from "./components/todo/changePasswordModal";
import { DecodeTokenInterface, UserService } from "./service/user.service";
import { AuthService } from "./service/auth.service";
import Cookies from "js-cookie";
import { TodoResponse, todoService } from "./service/todo.service";
import useStore from "./store";

interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userId: string;
}

function App() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [mode, setMode] = useState<string>("");
  const [todos, setTodos] = useState<TodoResponse[] | []>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoResponse[] | []>([]);
  const {setApiCalling} = useStore();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if(user) {
      fetchTodos();
    }
  }, [user]);

  const items = [
    {
      label: (
        <span>
          Welcome , <strong>{`${user?.firstName} ${user?.lastName}`}</strong>
        </span>
      ),
      key: "0",
    },
    {
      label: <span onClick={()=> {
        setShowModal("update");
        setMode("Update");
      }}>
        Update Details
      </span>,
      key: "1",
    },
    {
      label: <span onClick={() => setShowModal("changePassword")}>Change Password</span>,
      key: "2",
    },
    {
      label: <span onClick={handleLogout}>Logout</span>,
      key: "3",
    },
  ];

  function handleLogout() {
    Cookies.remove("token");
    setUser(null);
  }

  async function fetchUserData() {
      const response: DecodeTokenInterface | null = await UserService.decodeToken();
      if (response && response.user) {
         setUser(response.user);
      }
      setLoading(false);
    }

  async function fetchTodos() {
    const response : TodoResponse[] | null = await todoService.search(`?userId=${user?.userId}`);
    if(response != null && response != undefined) {
       setTodos(response);
       setFilteredTodos(response);
    }
  }

  function toggleModal() {
    setShowModal(null);
    setMode("");
  }

  async function hanldeSignUp(values: SignUp) {
    setApiCalling(true);
    if(mode == "Update") {
      handleUserUpdate(values);
      return;
    }
    const response = await UserService.create(values);
    if (response != null && response != undefined) {
      notification.success({ message: "Signup Successfully" });
      toggleModal();
    }
    setApiCalling(false);
  }

  async function handleUserUpdate(values: Partial<SignUp>) {
    const response: UserInterface | null = await UserService.update(user?.userId, values);
    if(response != null && response != undefined) {
      notification.success({message: "Details updated successfully"});
      fetchUserData();
      toggleModal();
      setShowModal("login");
    }
    setApiCalling(false);
  }

  async function handleLogin(values: Login) {
    setApiCalling(true);
    const response = await AuthService.login(values);
    if (response != null && response != undefined) {
      await fetchUserData();
      notification.success({ message: "Login Successfully" });
      toggleModal();
    }
    setApiCalling(false);
  }

  function handleSearch(value: string) {
    const searchValue = value.toLowerCase();
    const filteredData = todos.filter(todo => {
      const title = todo.title.toLowerCase().includes(searchValue);
      const description = todo.description.toLowerCase().includes(searchValue);
      const status = todo.status.toLowerCase().includes(searchValue);
      const createdAt = new Date(todo.createdAt).toLocaleDateString("en-GB").toLowerCase().includes(searchValue);
      return title || description || status || createdAt;
    });
    setFilteredTodos(filteredData);
  }
  return (
    <>
      {loading ? (
        <>Loading....</>
      ) : (
        <>
          <nav className="p-2">
            <Row justify="space-between" align="middle" className="mx-xl-5">
              <Col
                xs={24}
                sm={12}
                md={10}
                lg={8}
                className="d-flex align-items-center text-center"
              >
                <img className="logo" src={logo} alt="logo" />
                <h4 className="mt-1">TodoMate</h4>
              </Col>

              <Col>
                <Row gutter={10} align="middle" justify="end">
                  <Col>
                    <Input placeholder="Search todo" onChange={(e) => handleSearch(e.target.value)}/>
                  </Col>
                  <Col>
                    {user ? (
                      <>
                        <button
                          className="mx-2 px-2 py-1 create-todo"
                          onClick={() => setShowModal("createTodo")}
                        >
                          Create Todo
                        </button>
                        <Dropdown menu={{ items }} trigger={["click"]}>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              <img
                                src={downArrow}
                                className="m-xl-2"
                                alt="Dropdown Arrow"
                              />
                            </Space>
                          </a>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => setShowModal("login")}
                        >
                          Login
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowModal("create")
                            setMode("Create")
                          }}
                        >
                          SignUp
                        </button>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </nav>

          <Card className="mt-2 container">
            <Todo todos={filteredTodos} user={user} fetchTodos={fetchTodos} />
          </Card>

          {(showModal == "create" || showModal == "update") && mode && (
            <CreateUpdateModal
              showModal={showModal}
              toggleModal={toggleModal}
              handleSubmit={hanldeSignUp}
              user={user}
              mode={mode}
            />
          )}

          {showModal == "login" && (
            <LoginModal
              showModal={showModal}
              toggleModal={toggleModal}
              handleSubmit={handleLogin}
            />
          )}

          {showModal == "createTodo" && (
            <CreateTodoModal
              showModal={showModal}
              toggleModal={toggleModal}
              fetchTodos={fetchTodos}
            />
          )}

          {showModal == "changePassword" && (
            <ChangePasswordModal
              showModal={showModal}
              toggleModal={toggleModal}
              user={user}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
