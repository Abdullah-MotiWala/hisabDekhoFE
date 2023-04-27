import { useState } from "react";
import { Form, Input, Button, Tabs } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "../styles/LoginPage.module.css";
import { useApi, useAppDispatch } from "../customHooks/hooks";
import { apiRoutes } from "../../constants";
import { useRouter } from "next/router";
import { setToken, setUser } from "../store/user";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

const SignUpLoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinish = async (values, isSignIn) => {
    try {
      let response;
      let route = isSignIn ? apiRoutes.SIGN_IN : apiRoutes.SIGN_UP;
      response = await useApi({
        isSecure: false,
        method: "POST",
        url: route,
        body: values
      });
      if (response.success) {
        dispatch(setToken(response.access_token));
        dispatch(setUser(response.user));
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success"
        });
        router.replace("/");
      }
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error"
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Welcome back!</h2>
        <p>
          Sign in to your account to continue using our platform or create a new
          account.
        </p>
      </div>
      <div className={styles.rightSection}>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          centered
          className={styles.tabs}
        >
          <TabPane tab="Log In" key="1">
            <Form
              name="login"
              onFinish={(values) => onFinish(values, true)}
              scrollToFirstError
              className={styles.form}
            >
              <h3>Welcome back!</h3>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  autoComplete="off"
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <Form
              name="signup"
              onFinish={(values) => onFinish(values, false)}
              scrollToFirstError
              className={styles.form}
            >
              <h3>Create a new account</h3>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                  { min: 8, message: "Name must be at least 3 characters!" }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SignUpLoginPage;
