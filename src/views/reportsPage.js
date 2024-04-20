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
import Enumerable from 'linq';
import { Chart } from 'react-google-charts';
import { Breadcrumb, Card, Layout, Menu, Form, theme, Typography, InputNumber, Row, Col, Checkbox, Select, Input, Divider, Spin, Button } from 'antd';
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

const ReportsPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [clients, setClients] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCurrencyFrom, setdataCurrencyFrom] = useState([]);
    const [dataCurrencyTo, setdataCurrencyTo] = useState([]);
    const [dataByClient, setdataByClient] = useState([]);

    const currencies = [
        { name: 'Dolar estadounidense', code: 'USD', val: 1 },
        { name: 'Euro', val: 0.94, code: 'EUR' },
        { name: 'Dolar canadiense', code: 'CAD', val: 1.38 },
        { name: 'Peso dominicano', val: 59.10, code: 'DOP' },
    ]

    useEffect(() => {
        const reloadClients = () => {
            axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/user/all`).then(resp => {
                if (resp.data.length > 0) {
                    let _cs = resp.data.filter(x => x.roleId == 2);
                    setClients(_cs);
                }
            });
        }

        const reloadTransactions = () => {
            axios.get(`https://casa-cambio-api-2f47usihma-ue.a.run.app/transaction/all`).then(resp => {
                if (resp.data.length > 0) {
                    setTransactions(resp.data);
                }
            });
        }

        reloadClients();
        reloadTransactions();
        //Transactions By Currency To

        //Transactions By Client


        setLoading(false);
    }, []);


    useEffect(() => {
        if (!clients || !transactions) return;

        //Transactions By Currency From
        let currency_from = Object.groupBy(transactions, ({ currencyFrom }) => currencyFrom);
        let _cf = [["Moneda", "Cantidad"]];

        for (let p in currency_from) {
            let total = 0;
            for (let i in currency_from[p]) {
                total += currency_from[p][i].amount;
            }
            _cf.push([p, total]);
        }

        setdataCurrencyFrom(_cf);

        //Transactions By Currency From
        let currency_to = Object.groupBy(transactions, ({ currencyTo }) => currencyTo);
        let _ct = [["Moneda", "Cantidad"]];

        for (let q in currency_to) {
            let total = 0;
            for (let i in currency_to[q]) {
                total += currency_to[q][i].amount;
            }
            _ct.push([q, total]);
        }

        setdataCurrencyTo(_ct);

        //Transactions By Currency From
        let by_client = Object.groupBy(transactions, ({ clientId }) => clientId);
        let _bc = [["Cliente", "Cantidad"]];

        for (let r in by_client) {
            let total = 0;
            for (let i in by_client[r]) {
                total += by_client[r][i].amount;
            }
            let _cll = clients.filter(x => x.userId == r)[0];
            _bc.push([`${_cll?.firstName}, ${_cll?.lastName}`, total]);
        }

        setdataByClient(_bc);
    }, [clients, transactions]);

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
                        <Breadcrumb.Item>Reportes</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {loading && <Spin />}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card title="Transacciones por moneda recibida" bordered={false}>
                                    <Chart
                                        chartType="PieChart"
                                        data={dataCurrencyFrom}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Transacciones por moneda entregada" bordered={false}>
                                    <Chart
                                        chartType="PieChart"
                                        data={dataCurrencyTo}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                            <Card title="Transacciones por moneda entregada" bordered={false}>
                                    <Chart
                                        chartType="Bar"
                                        data={dataByClient}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </Card>
                            </Col>
                        </Row>
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
export default ReportsPage;
