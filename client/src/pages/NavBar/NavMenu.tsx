import React, { useState } from 'react';
import { Button, Flex, Menu, Drawer, Grid } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuth } from '../../redux/utils/auth';
import {
    MenuOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    BarChartOutlined,
    ProfileOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    HomeOutlined
} from '@ant-design/icons';
import './NavMenu.css';

const { useBreakpoint } = Grid;

const NavMenu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = !screens.md;

    const handleNavigation = (path: string) => {
        if (location.pathname === '/home') {
            // Если мы уже на главной странице, просто скроллим к секции
            const section = document.getElementById(path.replace('/home#', ''));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Иначе переходим на главную страницу и затем к секции
            navigate('/home');
            setTimeout(() => {
                const section = document.getElementById(path.replace('/home#', ''));
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Небольшая задержка для загрузки страницы
        }
        setVisible(false);
    };

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Главная',
            path: '/home'
        },
        {
            key: 'check',
            icon: <CheckCircleOutlined />,
            label: 'Проверка',
            path: '/home#check' // Добавляем хэш для секции
        },
        {
            key: 'grammar',
            icon: <FileTextOutlined />,
            label: 'Грамматика',
            path: '/home#grammar'
        },
        {
            key: 'analytics',
            icon: <BarChartOutlined />,
            label: 'Аналитика',
            path: '/home#analytics'
        },
        {
            key: 'reports',
            icon: <ProfileOutlined />,
            label: 'Отчеты',
            path: '/home#reports'
        }
    ];

    const authItems = isAuth() ? [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Профиль',
            path: '/account'
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Выйти',
            path: '/logOut'
        }
    ] : [
        {
            key: 'register',
            icon: <UserAddOutlined />,
            label: 'Регистрация',
            path: '/register'
        },
        {
            key: 'login',
            icon: <LoginOutlined />,
            label: 'Войти',
            path: '/login'
        }
    ];

    const toggleDrawer = () => {
        setVisible(!visible);
    };

    return (
        <header className="nav-header">
            <Flex justify="space-between" align="center" className="nav-container">
                <img 
                    className="nav-logo" 
                    src="/image/logo.png" 
                    onClick={() => navigate('/home')} 
                    alt="Логотип"
                />

                {isMobile ? (
                    <>
                        <Button 
                            type="text" 
                            icon={<MenuOutlined />} 
                            onClick={toggleDrawer}
                            className="burger-button"
                        />
                        <Drawer
                            title="Меню"
                            placement="right"
                            onClose={toggleDrawer}
                            open={visible}
                            className="nav-drawer"
                        >
                            <Menu mode="vertical" className="mobile-menu">
                                {menuItems.map(item => (
                                    <Menu.Item 
                                        key={item.key}
                                        icon={item.icon}
                                        onClick={() => {
                                            if (item.path.includes('#')) {
                                                handleNavigation(item.path);
                                            } else {
                                                navigate(item.path);
                                                setVisible(false);
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                ))}
                                {authItems.map(item => (
                                    <Menu.Item 
                                        key={item.key}
                                        icon={item.icon}
                                        onClick={() => {
                                            navigate(item.path);
                                            setVisible(false);
                                        }}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Drawer>
                    </>
                ) : (
                    <Flex gap="middle" align="center" className="desktop-menu">
                        {menuItems.map(item => (
                            <Button
                                key={item.key}
                                type="text"
                                icon={item.icon}
                                className="nav-button"
                                onClick={() => {
                                    if (item.path.includes('#')) {
                                        handleNavigation(item.path);
                                    } else {
                                        navigate(item.path);
                                    }
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        {authItems.map(item => (
                            <Button
                                key={item.key}
                                type="text"
                                icon={item.icon}
                                className="nav-button"
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Flex>
                )}
            </Flex>
        </header>
    );
};

export default NavMenu;