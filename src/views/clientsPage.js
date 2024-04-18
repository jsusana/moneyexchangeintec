import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Form, theme, Typography, InputNumber, Row, Col, Checkbox, Select, Input, Divider, Spin, Button } from 'antd';
import ChatBot from './chatbotPage';
const { Header, Content, Footer, Sider } = Layout;
const { Text, Title, Link } = Typography;
function getItem(label, key, icon, onclick) {
  return {
    key,
    icon,
    label,
    onclick
  };
}
const items = [
  getItem('Money Exchange', 'home', <MoneyCollectOutlined />),
  getItem('Transacciones', 'transactions', <DesktopOutlined />),
  getItem('Clientes', 'clients', <UserOutlined />),
  getItem('Facturas', 'invoices', <FileOutlined />),
  getItem('Reportes', 'reports', <FileOutlined />),
];

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ClientsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const clients = [
    {FirstName: 'Juan Marcos', LastName: 'Susana Feliz'},
    {FirstName: 'Claudio', LastName: 'Brito'},
    {FirstName: 'Santiago', LastName: 'Fernandez'},
    {FirstName: 'Ana', LastName: 'Sirí'},
  ];

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(item, key, keyPath, selectedKeys, domEvent) => { window.location.href = '/' + item.key }} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Clientes</Breadcrumb.Item>
            <Breadcrumb.Item>Todos</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Divider orientation='left'><Text style={{ fontSize: 20, fontWeight: 'bolder' }}><UserOutlined /> Clientes</Text></Divider>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          <MoneyCollectOutlined /> Money Exchange ©{new Date().getFullYear()}
        </Footer>
      </Layout>
      <ChatBot />
    </Layout>
  );
};
export default ClientsPage;