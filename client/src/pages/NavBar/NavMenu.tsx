

import { Flex, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';


import MenuItem from 'antd/es/menu/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../redux/reducers/UserSlice';
import { RootState } from '../../store';
//import { logOutUser } from '../../../../source/repos/gymClient/gymclient/src/redux/utils/auth';

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
    width: 60, height: 60, position: 'absolute'
}


const NavMenu: React.FC = () => {


    const [current, setCurrent] = useState('home')

    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.user)


    const onClick: MenuProps['onClick'] = (e: any) => {
        setCurrent(e.key);
    };

    return (
        <>
            <Flex gap={30} className='headerStyle' align={'flex-start'} justify={'flex-end'}>

                <NavLink to="/home" >Главная</NavLink>
                <NavLink to="/login" >Войти</NavLink>
                <NavLink to = "register">Зарегестрироваться</NavLink>
                {user.user.jwtToken.length === 0 ?
                    <>
                    <NavLink to="/login" >Войти</NavLink>
                    <NavLink to = "register">Зарегестрироваться</NavLink>
                    </>
                    :
                 <>
                 </>
                }
            </Flex >
        </>
    )
};

export default NavMenu