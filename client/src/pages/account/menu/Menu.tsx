
import { Col, ConfigProvider, Row } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import style from './login.module.scss';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocale } from 'antd/es/locale';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { MenyKeyType, select } from '../../../redux/reducers/MenuReducer';

type MenuItem = Required<MenuProps>['items'][number];

const itemMenuStyle: React.CSSProperties = {
    padding: '10px',
    marginTop: '2em'

}

const iconStyle: React.CSSProperties = {
    width: '2em',
    height: '2em'
}

const menuStyle: React.CSSProperties = {
    padding: '1.5em',
    backgroundColor: 'black',
    // margin: '2em'
    height: '86vh'
}



const items: MenuItem[] = [

    {
        key: 'file',
        icon: <img style={iconStyle} src='/image/fileIcon.png' />,
        label: 'Мои файлы',
        style: itemMenuStyle
    },
    {
        key: 'check',
        icon: <img style={iconStyle} src='/image/checkIcon.png' />,
        label: 'Проверка',
        style: itemMenuStyle
    },
    {
        key: 'grammar',
        icon: <img style={iconStyle} src='/image/grammarIcon.png' />,
        label: 'Грамматика',
        style: itemMenuStyle
    },
    {
        key: 'analytic',
        icon: <img style={iconStyle} src='/image/analyticIcon.png' />,
        label: 'Аналитика',
        style: itemMenuStyle
    },
    {
        key: 'report',
        icon: <img style={iconStyle} src='/image/reportIcon.png' />,
        label: 'Отчеты',
        style: itemMenuStyle
    },
    {
        key: 'account',
        icon: <img style={iconStyle} src='/image/accountIcon.png' />,
        label: 'Мой профиль',
        style: itemMenuStyle
    },
    {
        key: 'group',
        icon: <img style={iconStyle} src='/image/groupIcon.png' />,
        label: 'Группы',
        style: itemMenuStyle
    }
]

const MenuComponent: React.FC = () => {

    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(select(e.key as MenyKeyType))
        navigate(`${e.key}`);
    };

    const navigate = useNavigate()
    const menuState = useAppSelector((state: RootState) => state.menu)
    const dispatch = useAppDispatch()

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            darkItemSelectedBg: '#D189C9',
                            algorithm: true,
                        }
                    },
                }}
            >
                <Menu
                    style={menuStyle}
                    defaultSelectedKeys={[menuState.menuKey]}
                    selectedKeys={[menuState.menuKey]}
                    mode='inline'
                    theme='dark'
                    items={items}
                    onClick={onClick}
                />
            </ConfigProvider >
        </>

    )
}

export default MenuComponent;
