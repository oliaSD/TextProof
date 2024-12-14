import { Layout } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import MenuComponent from './account/menu/Menu'
import NavMenu from './NavBar/NavMenu';


const { Header, Footer, Content } = Layout;


const FooterContainer: React.FC = () => {
  return (

    <>
      <div style={{ color: 'white' }} className='copyright' title='Контакты'>
        Вы можете связаться с нами:
        <span className="spaced-element">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.47 16.83L18.86 19.99C18.96 20.82 18.07 21.4 17.36 20.97L13.17 18.48C12.71 18.48 12.26 18.45 11.82 18.39C12.56 17.52 13 16.42 13 15.23C13 12.39 10.54 10.09 7.49997 10.09C6.33997 10.09 5.26997 10.42 4.37997 11C4.34997 10.75 4.33997 10.5 4.33997 10.24C4.33997 5.68999 8.28997 2 13.17 2C18.05 2 22 5.68999 22 10.24C22 12.94 20.61 15.33 18.47 16.83Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 15.23C13 16.42 12.56 17.52 11.82 18.39C10.83 19.59 9.26 20.36 7.5 20.36L4.89 21.91C4.45 22.18 3.89 21.81 3.95 21.3L4.2 19.33C2.86 18.4 2 16.91 2 15.23C2 13.47 2.94 11.92 4.38 11C5.27 10.42 6.34 10.09 7.5 10.09C10.54 10.09 13 12.39 13 15.23Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg> textproof@gmail.com
        </span>

        <span className="spaced-element">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.22 21.63C13.04 21.63 11.37 20.8 10.05 16.83L9.33 14.67L7.17 13.95C3.21 12.63 2.38 10.96 2.38 9.78001C2.38 8.61001 3.21 6.93001 7.17 5.60001L15.66 2.77001C17.78 2.06001 19.55 2.27001 20.64 3.35001C21.73 4.43001 21.94 6.21001 21.23 8.33001L18.4 16.82C17.07 20.8 15.4 21.63 14.22 21.63ZM7.64 7.03001C4.86 7.96001 3.87 9.06001 3.87 9.78001C3.87 10.5 4.86 11.6 7.64 12.52L10.16 13.36C10.38 13.43 10.56 13.61 10.63 13.83L11.47 16.35C12.39 19.13 13.5 20.12 14.22 20.12C14.94 20.12 16.04 19.13 16.97 16.35L19.8 7.86001C20.31 6.32001 20.22 5.06001 19.57 4.41001C18.92 3.76001 17.66 3.68001 16.13 4.19001L7.64 7.03001Z" fill="black" />
          </svg>
          Telegram
        </span>
      </div>
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