import React from "react";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, MoneyCollectTwoTone } from "@ant-design/icons";
import ChatBot from './chatbotPage';
import axios from 'axios';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function LoginPage() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usersList, setUserList] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    async function GetUsersList() {

    }
  }, []);
  

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}><MoneyCollectTwoTone twoToneColor="#1677ff" /> Money Exchange</Title>
          <Text style={styles.text}>
            Bienvenido/a a Money Excange. Tanto clientes como empleados pueden acceder utilizando este sitio.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined value={username} onChange={(e) => setUsername(e.target.value)} />}
              placeholder="Usuario"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" onClick={e => { window.location.href = "/home" }}>
              Acceder
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>¿No posee una cuenta?</Text>{" "}
              <Link href="">Regístrese aquí</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <ChatBot />
    </section>
  );
}