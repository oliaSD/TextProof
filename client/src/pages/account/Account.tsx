
import { useLocation } from 'react-router'
import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import MenuComponent from './menu/Menu';
import { FileComponent } from './file/File';
import { CheckAccountComponent } from './check/Check';
import { ReportComponent } from './report/Report';
import { calc } from 'antd/es/theme/internal';
import GroupsPage from './group/Group';
import { getUser } from '../../redux/utils/auth';
import GrammarComponent from '../account/grammar/Grammar';
import UserProfilePage from './user/UserProfilePage';
import { AnalyticComponent } from '../home/Analytics';
import StatsPage from './analytic/AnalyticPage';

const { Content, Sider } = Layout;

const AccountComponent: React.FC = () => {

    const location = useLocation();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const page = () => {
        console.log(location)
        switch (location.pathname) {
            case '/account/file': return <FileComponent
                uriGetFilesAction={`http://localhost:8081/papers/get/${getUser().username}`}
                uriUploadFileAction={`http://localhost:8081/papers/upload/${getUser().username}`}
                uriPostFilesCheckAction={`http://localhost:8081/papers/check/${getUser().username}/`}
                uriNavigate={'/account/check'}
            />
            case '/account/check': return <CheckAccountComponent
                uriGetCheksAction={`http://localhost:8081/papers/checks/${getUser().username}`}
                uriGetStatusAction={`http://localhost:8081/papers/status/${getUser().username}/`}
                uriUpdateFilesAction={`http://localhost:8081/papers/checks/${getUser().username}`}
                uriNavigate=''
            />
            case '/account/grammar' : return <GrammarComponent />
            case '/account/report': return <ReportComponent />
            case '/account/group': return <GroupsPage />
            case '/account/account' : return <UserProfilePage/>
            case '/account/analytic' : return <StatsPage userId={getUser().username}/>
            default: return <></>
        }
    }

    return (
        <Layout
        // style={{ minHeight: 'calc(86vh)' }}
        >
            <Sider style={{ background: colorBgContainer }}>
                <MenuComponent />
            </Sider>
            <Content>
                {
                    page()
                }
            </Content>
        </Layout>
    );
};

export default AccountComponent;
