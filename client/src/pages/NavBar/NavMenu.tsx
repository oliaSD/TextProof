

import { Button, Flex, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';


import MenuItem from 'antd/es/menu/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../redux/reducers/UserSlice';
import { RootState } from '../../store';
import './NavMenu.css';
import { logOutUser, isAuth } from '../../redux/utils/auth';

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 60,
    border: 'none',
};

const menuStyle: React.CSSProperties = {
    display: 'flex',
    minWidth: '20%',
    height: 60,
    border: 'none',
    backgroundColor: 'black',
    color: 'white',
}

const imageStyle: React.CSSProperties = {
    width: 120, height: 60, cursor: 'pointer'
}

const imageIconStyle: React.CSSProperties = {
    width: 30, height: 30, cursor: 'pointer', marginRight: '1em'
}

const navLinkStyle: React.CSSProperties = {
    color: 'white',
    padding: '3em',
}

const NavMenu: React.FC = () => {


    const [current, setCurrent] = useState('home')

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const user = useAppSelector((state: RootState) => state.user)

    return (
        <>
            <Flex gap={30} className='headerStyle' align={'flex-end'} justify={'flex-end'}>
                <img style={imageStyle} src="image/logo.png" onClick={() => navigate('/home')}></img>
                <Flex gap={30} className='headerStyle' align={'flex-center'} justify={'flex-end'}>
                    <div className='blockDiv'>

                        <NavLink style={navLinkStyle} to="/check">
                            <img style={imageIconStyle} src="image/checkIcon.png" ></img>
                            Проверка
                        </NavLink>
                    </div>
                    <div className='blockDiv'>
                        <NavLink style={navLinkStyle} to="/grammar">
                            <img style={imageIconStyle} src="image/grammarIcon.png" ></img>
                            Грамматика
                        </NavLink>
                    </div>
                    <div className='blockDiv'>
                        <NavLink style={navLinkStyle} to="/analytics">
                            <img style={imageIconStyle} src="image/analyticIcon.png" ></img>
                            Аналитика
                        </NavLink>
                    </div>
                    <div className='blockDiv'>
                        <NavLink style={navLinkStyle} to="/reports">
                            <img style={imageIconStyle} src="image/reportIcon.png" ></img>
                            Отчеты
                        </NavLink>
                    </div>
                    {
                        isAuth() ?
                            <>
                                <Button className='nav-button' onClick={() => { navigate('/account') }} > Профиль</Button>
                                <Button className='nav-button' onClick={() => { navigate('/logOut') }} > Выйти</Button>
                            </>
                            :
                            <>
                                <Button className='nav-button' onClick={() => { navigate("/register") }}>Регистрация</Button>
                                <Button className='nav-button' onClick={() => { navigate("/login") }}>Войти</Button>
                            </>
                    }

                </Flex>
            </Flex >
        </>
    )
};

export default NavMenu