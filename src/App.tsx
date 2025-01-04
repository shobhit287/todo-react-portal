import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Todo from "./components/todo";
import { Card, Col, Input, notification, Row } from "antd";
import SignupModal from "./components/todo/signUpModal";
import LoginModal from "./components/todo/loginModal";
import { UserService } from "./service/user.service";
import { AuthService } from "./service/auth.service";
import Cookies from "js-cookie";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface SignUp {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

interface Login {
  email: string,
  password: string,
}
function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  function toggleSignUpModal() {
    setShowSignUpModal(!showSignUpModal);
  }

  function toggleLoginModal() {
    setShowLoginModal(!showLoginModal);
  }

  async function hanldeSignUp(values: SignUp) {
    const response = await UserService.create(values);
    if(response != null && response != undefined) {
      notification.success({message: "Signup Successfully"});
      toggleSignUpModal();
    }
  }

  async function handleLogin(values: Login) {
    const response = await AuthService.login(values);
    if(response != null && response != undefined) {
      const token : string | undefined = Cookies.get("token");
      const decodedToken = jwtDecode(token as string);
      setUser(decodedToken);
      notification.success({message: "Login Successfully"});
      toggleLoginModal();
    }
  }
  return (
    <>
      <nav className="p-2">
        <Row justify="space-between" align="middle" className="mx-xl-5">
          <Col
            xs={24} sm={12} md={10} lg={8}
            className="d-flex align-items-center text-center"
          >
            <img className="logo" src={logo} alt="logo"/>
            <h4 className="mt-1">Todo Application</h4>
          </Col>

          <Col>
            <Row gutter={10} align="middle" justify="end">
              <Col>
                <Input placeholder="Search todo" />
              </Col>
              <Col>
                {user ? <>
                <button className="mx-2">Create Todo</button>
                </>: <>
                <button className="btn btn-primary mx-2" onClick={toggleLoginModal}>Login</button>
                <button className="btn btn-danger" onClick={toggleSignUpModal}>SignUp</button>
                </>}
              </Col>
            </Row>
          </Col>
        </Row>
      </nav>

      <Card className="mt-2 container">
        <Todo />
      </Card>

      {showSignUpModal && <SignupModal showModal={showSignUpModal} toggleModal={toggleSignUpModal} handleSubmit={hanldeSignUp}/>}
      {showLoginModal && <LoginModal showModal={showLoginModal} toggleModal={toggleLoginModal} handleSubmit={handleLogin}/>}
    </>
  );
}

export default App;
