
import { useLocation, useParams } from 'react-router'
import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import GroupMenuComponent from './GroupMenu';
import { FileComponent } from '../file/File';
import { CheckAccountComponent } from '../check/Check';
import { calc } from 'antd/es/theme/internal';
import GroupsPage from './Group';
import { getUser } from '../../../redux/utils/auth';
import StatsPage from '../analytic/AnalyticPage';

const { Content, Sider } = Layout;

const GroupAccountComponent: React.FC = () => {

    const location = useLocation();

    const { id } = useParams();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const page = () => {
        console.log(location)
        switch (location.pathname) {
            case `/group/file/${id}`: return <FileComponent
                uriGetFilesAction={`http://localhost:8081/papers/group/get/${id}`}
                uriUploadFileAction={`http://localhost:8081/papers/group/upload/${id}`}
                uriPostFilesCheckAction={`http://localhost:8081/papers/group/check/${id}/`}
                uriNavigate={`/group/check/${id}`}
            />
            case `/group/check/${id}`: return <CheckAccountComponent
                uriGetCheksAction={`http://localhost:8081/papers/group/checks/${id}`}
                uriGetStatusAction={`http://localhost:8081/papers/group/status/${id}/`}
                uriUpdateFilesAction={`http://localhost:8081/papers/group/checks/${id}`}
                uriNavigate='' />
            case `/group/${id}`: return <GroupsPage />
            case  `/group/analytic/${id}` : return <StatsPage userId={id!}/>
            default: return <></>
        }
    }

    return (
        <Layout
        // style={{ minHeight: 'calc(86vh)' }}
        >
            <Sider style={{ background: colorBgContainer }}>
                <GroupMenuComponent />
            </Sider>
            <Content>
                {
                    page()
                }
            </Content>
        </Layout>
    );
};

export default GroupAccountComponent;
