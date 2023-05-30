import React, {useEffect} from 'react';
import {
    DashboardOutlined,
    FileOutlined,
    MailOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme , Typography} from 'antd';
import { useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import AppLogo from '../assests/app-logo.png';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const AppLayout = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [route, setRoute] = useState('');

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const routes = [
        getItem('Dashboard', '/', <DashboardOutlined />),
        getItem('Reporting', 'reporting', <FileOutlined />, [
            getItem('Twitter', '/reporting/twitter/', <TwitterOutlined />),
            getItem('Youtube', '/reporting/youtube/', <YoutubeOutlined />)
        ]),
        getItem('Contact Us', '/contact-us', <MailOutlined />)
    ];

    useEffect(() => {
        const isCollapsed = localStorage.getItem('isCollapsed');

        if(isCollapsed !== null)
            isCollapsed === 'true' ? setCollapsed(true) : setCollapsed(false);

        setRoute(location.pathname);
    }, []);

    const handleCollapse = (isCollapsed) => {
        localStorage.setItem('isCollapsed', isCollapsed);
        setCollapsed(isCollapsed);
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => handleCollapse(value)}>
                <div
                    type="button"
                    tabIndex={0}
                    onClick={() => {
                        navigate('/');
                        setRoute('/');
                    }}
                    className="text-center m-3"
                    style={{cursor: 'pointer'}}
                >
                    <img width="45%" height="44%" src={AppLogo} alt="yap-logo" />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[route]}
                    selectedKeys={[route]}
                    mode="inline"
                    items={routes}
                    onSelect={(item) => {
                        setRoute(item.key);
                        navigate(item.key);
                    }}
                >
                    {
                        routes.map(route => (
                            <Menu.Item key={route.key}>
                                {route.label}
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="text-center">
                        <Typography.Title
                            level={2}
                            className="mt-2"
                            style={{
                                margin: 0,
                                color: '#002140'
                            }}
                        >
                            R3portal
                        </Typography.Title>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {props.children}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    R3portal ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;