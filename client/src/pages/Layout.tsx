import { ConfigProvider, Layout } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import MenuComponent from './account/menu/Menu'
import NavMenu from './NavBar/NavMenu';
import { GithubOutlined, TwitterOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

const FooterContainer: React.FC = () => {
  return (
    <div className="footer-content compact-footer">
      <div className="footer-grid compact-grid">
        <div className="footer-section">
          <h3 className="footer-title">О сервисе</h3>
          <p className="footer-text compact-text">
            TextProof - современный инструмент для проверки текстов на уникальность и грамматику.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Контакты</h3>
          <div className="footer-contacts">
            <a href="mailto:textproof@gmail.com" className="footer-link compact-link">
              <MailOutlined /> textproof@gmail.com
            </a>
            <a href="https://t.me/textproof" className="footer-link compact-link">
              <MessageOutlined /> Telegram
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Ресурсы</h3>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link compact-link">Политика конфиденциальности</Link>
            <Link to="/terms" className="footer-link compact-link">Условия использования</Link>
            <Link to="/docs" className="footer-link compact-link">Документация</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom compact-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} TextProof. Все права защищены.
        </span>
      </div>
    </div>
  );
};

const Lay = (props: { children?: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          footerBg: 'transparent',
          footerPadding: '12px 50px', // Уменьшил padding с 24px до 12px
        },
      },
    }}
  >
    <Layout className="layout">
      <Header className="headerStyle">
        <NavMenu />
      </Header>

      <Content className="content">
        {props.children}
      </Content>
      
      <Footer className="footer compact-footer-container">
        <FooterContainer />
      </Footer>
    </Layout>
  </ConfigProvider>
);

export default Lay;