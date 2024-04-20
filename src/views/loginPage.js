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

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let password = values.password;
    let username = values.email;
    if (password.length == 0 || username.length == 0) {
      alert('Usuario y contraseña son requeridos para acceder al sitio.');
      return;
    }

    axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/user/getUserByUsername/${username}`).then(resp => {
      if (resp.data.length > 0) {
        let user = resp.data[0];
        if (user.password === password)
          window.location.href = '/#/home';
      }
      else      
        alert("Credenciales inválidas.");      
    }).catch(err => {alert("Ha ocurrido un error inesperado. Favor ponerse en contacto con soporte técnico.");});
  };

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
          >
            <Input
              prefix={<MailOutlined />}
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
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
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