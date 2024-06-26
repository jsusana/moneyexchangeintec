import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}
const items = [
  getItem('Money Exchange', 'home', <MoneyCollectOutlined />),
  getItem('Reportes', 'reports', <FileOutlined />),
];

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [newClient, setNewClient] = useState(false);
  const [clientFirstName, setClientFirstName] = useState('');
  const [clientLastName, setClientLastName] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyfromlegend, setcurrencyFromLegend] = useState('');
  const [currencytolegend, setcurrencyToLegend] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');
  const [amount, setAmount] = useState(0.00);
  const [convertedAmount, setConvertedAmount] = useState(0.00);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { name: 'Dolar estadounidense', code: 'USD', val: 1 },
    { name: 'Euro', val: 0.94, code: 'EUR' },
    { name: 'Dolar canadiense', code: 'CAD', val: 1.38 },
    { name: 'Peso dominicano', val: 59.10, code: 'DOP' },
  ]

  const getCurrencyLegend = (a) => {
    let c = a == 1 ? currencyFrom : currencyTo;
    if (!c) return '';

    let _cs = currencies.filter(_c => _c.name == c);
    let _c = _cs ? _cs[0] : {};

    return `1 USD = ${_c.code} ${_c.val}`;
  };

  const processTransaction = async (e) => {

    if (!clientFirstName || !clientLastName || !currencyFrom || !currencyTo || !amount)
    {
      alert('Complete todos los datos antes de procesar la transacción.');
      return;
    }

    setLoading(!loading);
    let clientId = 0;
    if (newClient) {
      let clientPayload = {
        firstName: clientFirstName,
        lastName: clientLastName,
        roleId: 2,
        username: '',
        password: ''
      }
      
      let clientResp = await axios.post('https://casa-cambio-api-2f47usihma-ue.a.run.app/user/create', clientPayload);
      let _clients = await axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/user/all`);
      clientId = _clients.data.slice(-1).userId;
    }

    if (clientId <= 0) {
      let _clients2 = (await axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/user/all`)).data;
      clientId = _clients2.filter(c => c.firstName == clientFirstName && c.lastName == clientLastName)[0].userId;
    }

    let transactionPayload = {
      clientId: clientId,
      employeeId: 1,
      amount: amount,
      currencyFrom: currencyFrom,
      currencyTo: currencyTo
    }

    let trans_response = await axios.post('https://casa-cambio-api-2f47usihma-ue.a.run.app/transaction/create', transactionPayload);
    window.location.reload();
  };

  useEffect(() => {
    setcurrencyFromLegend(getCurrencyLegend(1));
    setcurrencyToLegend(getCurrencyLegend(2));
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    if (!amount || !currencyFrom || !currencyTo) return;
    let _cs = currencies.filter(_c => _c.name == currencyFrom);
    let cFrom = _cs[0];
    _cs = currencies.filter(_c => _c.name == currencyTo);
    let cTo = _cs[0];

    let newAmount = amount / cFrom.val;
    newAmount = newAmount * cTo.val;
    setConvertedAmount((Math.round(newAmount * 100) / 100).toFixed(2));
  }, [amount, currencyFrom, currencyTo]);

  useEffect(() => {
    const reloadClients = () => {
        axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/user/all`).then(resp => {
          if (resp.data.length > 0) {
            let _cs = resp.data.filter(x => x.roleId == 2).map(c => { return { value: c.lastName + ', ' + c.firstName } });
            setClients(_cs);
          }
        });
    }

    reloadClients();
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(item, key, keyPath, selectedKeys, domEvent) => { window.location.href = '/#/' + item.key }} />
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
            <Breadcrumb.Item>Transacciones</Breadcrumb.Item>
            <Breadcrumb.Item>Nueva transacción</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Divider orientation='left'><Text style={{ fontSize: 20, fontWeight: 'bolder' }}><UserOutlined /> Cliente</Text></Divider>
            <Row>
              <Col span={4}><Checkbox value={newClient} onChange={e => setNewClient(e.target.checked)}>¿Nuevo cliente?</Checkbox></Col>
              {!newClient && <Col span={20}>
                <Select
                  showSearch
                  placeholder="Seleccione un cliente..."
                  optionFilterProp="children"
                  filterOption={filterOption}
                  value={(() => clientLastName ? `${clientLastName}, ${clientFirstName}` : null)()}
                  onChange={(value) => { setClientLastName(value.split(',')[0].trim()); setClientFirstName(value.split(',')[1].trim()); }}
                  style={{ width: '100%' }}
                  options={clients}
                />
              </Col>
              }
              {newClient && <>
                <Col span={10}>
                  <Input addonBefore={"Nombre(s): "} value={clientFirstName} onChange={(value) => setClientFirstName(value.target.value)} />
                </Col>
                <Col span={10}>
                  <Input addonBefore={"Apellido(s): "} value={clientLastName} onChange={(value) => setClientLastName(value.target.value)} />
                </Col>
              </>
              }
            </Row>

            <div style={{ marginTop: 30 }}>
              <Divider orientation='left'><Text style={{ fontSize: 20, fontWeight: 'bolder' }}><UnorderedListOutlined /> Detalles</Text></Divider>
            </div>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Moneda recibida: " name="currencyFrom" help={currencyfromlegend}>
                  <Select
                    value={currencyFrom}
                    onChange={value => setCurrencyFrom(value)}
                    options={[
                      {
                        value: 'Dolar estadounidense',
                      },
                      {
                        value: 'Euro',
                      },
                      {
                        value: 'Dolar canadiense',
                      },
                      {
                        value: 'Peso dominicano',
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Cantidad: " name="amount">
                  <InputNumber min={1} prefix="$" style={{ width: '100%' }} onChange={val => setAmount(val)} value={amount} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Moneda recibida: " name="currencyFrom" help={currencytolegend}>
                  <Select
                    value={currencyTo}
                    onChange={value => setCurrencyTo(value)}
                    options={[
                      {
                        value: 'Dolar estadounidense',
                      },
                      {
                        value: 'Euro',
                      },
                      {
                        value: 'Dolar canadiense',
                      },
                      {
                        value: 'Peso dominicano',
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Cantidad: " name="amount">
                  <Text style={{ fontWeight: 'bolder' }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(convertedAmount)}</Text>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: 30 }}>
            <Divider orientation='center'>
              <>
                {!loading && <Button type='primary' onClick={(e) => { processTransaction(e).then(() => console.log('Transacción procesada')); }}>Procesar Transacción</Button>}
                {loading && <Button disabled={true} type='default' onClick={(e) => { setLoading(!loading) }}> <Spin /> </Button>}
              </>
            </Divider>
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
export default HomePage;
