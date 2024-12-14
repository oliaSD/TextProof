
import { Col, Row } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router';
import style from './account.module.scss';

import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuComponent from './menu/Menu';
import { FileComponent } from './file/File';
import { CheckAccountComponent } from './check/Check';
import { ReportComponent } from './report/Report';

const { Header, Content, Footer, Sider } = Layout;

const AccountComponent: React.FC = () => {

    const location = useLocation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const page = () => {
        console.log(location)
        switch (location.pathname) {
            case '/account/file': return <FileComponent />
            case '/account/check': return <CheckAccountComponent />
            case '/account/report' : return <ReportComponent/>
            default: return <></>
        }
    }

    useEffect(() => {
        console.log(location)
    }, [])

    return (
        <Layout
            style={{ minHeight: 'calc(86vh)' }}
        >
            <Sider style={{ background: colorBgContainer }} width={500}>
                <MenuComponent />
            </Sider>
            <Content style={{ minHeight: 280, backgroundColor : 'black' }}>
                {
                    page()
                }
            </Content>
        </Layout>
    );
};

export default AccountComponent;
