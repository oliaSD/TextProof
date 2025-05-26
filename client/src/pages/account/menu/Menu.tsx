import { Col, ConfigProvider, Row, Button } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { MenyKeyType, select } from '../../../redux/reducers/MenuReducer';
import { 
  FileOutlined, 
  CheckOutlined, 
  EditOutlined, 
  BarChartOutlined, 
  UserOutlined, 
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined 
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const collapsedWidth = 80;
const expandedWidth = 200;

const MenuComponent: React.FC = () => {

  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuState = useAppSelector((state: RootState) => state.menu);
  const dispatch = useAppDispatch();

  const items: MenuItem[] = [
    {
      key: 'file',
      icon: <FileOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Мои файлы',
    },
    {
      key: 'check',
      icon: <CheckOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Проверка',
    },
    {
      key: 'grammar',
      icon: <EditOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Грамматика',
    },
    {
      key: 'analytic',
      icon: <BarChartOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Аналитика',
    },
    {
      key: 'account',
      icon: <UserOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Мой профиль',
    },
    {
      key: 'group',
      icon: <TeamOutlined style={{ fontSize: '20px' }} />,
      label: collapsed ? null : 'Группы',
    }
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(select(e.key as MenyKeyType));
    navigate(`${e.key}`);
  };

  return (
    <div style={{ 
      width: collapsed ? collapsedWidth : expandedWidth,
      transition: 'width 0.2s ease',
      backgroundColor: 'black',
      height: 'calc(100vh - 140px)',
      position: 'relative'
    }}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemSelectedBg: '#D189C9',
              itemHeight: 50,
              itemPaddingInline: 24,
              collapsedWidth: collapsedWidth,
            }
          },
        }}
      >
        <Menu
          style={{ 
            backgroundColor: 'black',
            height: '100%',
            paddingTop: '20px'
          }}
          defaultSelectedKeys={[location.pathname.split('/').pop() || 'files']}
          selectedKeys={[menuState.menuKey]}
          mode='inline'
          theme='dark'
          inlineCollapsed={collapsed}
          items={items}
          onClick={onClick}
        />
        
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '16px'
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default MenuComponent;