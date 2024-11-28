import { Layout } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import  NavMenu from './NavBar/NavMenu';

const { Header, Footer, Content } = Layout;


const FooterContainer: React.FC = () => {
  return (

    <>
      <Link style={{ color: 'white' }} to='https://t.me/oliasD' className='copyright' title='Контакты'>
        Информационная система "Рейтинг студентов" ©{new Date().getFullYear()} Созданно Семерник О. Д.
      </Link>
    </>
  )
}


const Lay = (props: { children?: React.ReactNode }) => (
  <>
    <Layout className='layout'>
      <Header className='headerStyle' >
        <NavMenu />
            </Header>
      <Content className='content'>
        {props.children}
      </Content>
      <Footer className='footer'>
        <>
          <FooterContainer />
        </>
      </Footer>
      {/* <Footer style={footerStyle} /> */}
    </Layout>
  </>
);

export default Lay